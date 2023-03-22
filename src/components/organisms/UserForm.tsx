import { Form, Input, Modal, Select } from 'antd'
import * as React from 'react'
import { User, UserGroup } from '../../generated/graphql'
import { CrudModal } from '../../util/crud'
import { InnerForm } from '../atoms/InnerForm'

interface IProps extends CrudModal<User> {
  entity?: User
}

export const UserForm: React.FunctionComponent<IProps> = ({
  entity,
  onOk,
  onCancel
}) => {
  const [loading, setLoading] = React.useState(false)
  const [input, setInput] = React.useState<Partial<User>>(
    entity || {
      username: '',
      email: '',
      group: UserGroup.Managers
    }
  )

  const setField = <T extends unknown>(field: string) => (value: T) =>
    setInput({
      ...input,
      [field]: value
    })

  const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setField<string>(target.name)(target.value)

  const handleSelect = (group: UserGroup) => setField<UserGroup>('group')(group)

  const handleOk = async () => {
    setLoading(true)
    try {
      await onOk(input)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={entity ? 'Editar acesso' : 'Novo acesso'}
      visible
      onOk={handleOk}
      okText={entity ? 'Salvar alterações' : 'Criar acesso'}
      confirmLoading={loading}
      onCancel={onCancel}
      cancelText='Cancelar'
    >
      <InnerForm onOk={handleOk}>
        <Form.Item label='Nome de usuário'>
          <Input
            name='username'
            value={input.username || ''}
            onChange={handleInput}
          />
        </Form.Item>
        <Form.Item label='E-mail'>
          <Input
            name='email'
            value={input.email || ''}
            onChange={handleInput}
          />
        </Form.Item>
        <Form.Item label='Cargo'>
          <Select
            value={input.group}
            onChange={handleSelect}
            style={{ width: '100%' }}
          >
            <Select.Option value={UserGroup.Managers}>Gerente</Select.Option>
            <Select.Option value={UserGroup.Supervisors}>
              Supervisor
            </Select.Option>
            <Select.Option value={UserGroup.Assistants}>
              Assistente Administrativo
            </Select.Option>
          </Select>
        </Form.Item>
      </InnerForm>
    </Modal>
  )
}

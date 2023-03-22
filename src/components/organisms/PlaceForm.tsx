import * as React from 'react'
import { Place } from '../../generated/graphql'
import { Modal, Form, Input, Row, Col } from 'antd'
import { formatCurrency, numberify } from '../../util/format'
import { CrudModal } from '../../util/crud'
import { InnerForm } from '../atoms/InnerForm'

interface IProps extends CrudModal<Place> {
  entity?: Place
}

export const PlaceForm: React.FunctionComponent<IProps> = ({
  entity,
  onOk,
  onCancel
}) => {
  const [loading, setLoading] = React.useState(false)
  const [input, setInput] = React.useState<Partial<Place>>(
    entity || {
      name: '',
      headcount: 10,
      personPrice: 10000,
      leaderPrice: 12000,
      retailPrice: 20000
    }
  )

  const setField = <T extends unknown>(field: string) => (value: T) =>
    setInput({
      ...input,
      [field]: value
    })

  const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setField<string>(target.name)(target.value)

  const handleNumber = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setField<number>(target.name)(+numberify(target.value))

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
      title={entity ? 'Editar estabelecimento' : 'Novo estabelecimento'}
      visible
      onOk={handleOk}
      okText={entity ? 'Salvar alterações' : 'Criar estabelecimento'}
      confirmLoading={loading}
      onCancel={onCancel}
      cancelText="Cancelar"
    >
      <InnerForm onOk={handleOk}>
        <Form.Item label="Nome">
          <Input name="name" value={input.name || ''} onChange={handleInput} />
        </Form.Item>
        <Form.Item label="Efetivo diário">
          <Row gutter={10}>
            <Col md={8}>
              <Input
                type="number"
                name="headcount"
                value={input.headcount || 0}
                onChange={handleNumber}
                min={0}
                step={1}
              />
            </Col>
            <Col md={8}>pessoas</Col>
          </Row>
        </Form.Item>
        <Form.Item label="Diária padrão">
          <Row gutter={10}>
            <Col md={8}>
              <Input
                name="personPrice"
                value={formatCurrency(input.personPrice || 0)}
                onChange={handleNumber}
                min={0}
                step={1}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="Diária líder">
          <Row gutter={10}>
            <Col md={8}>
              <Input
                name="leaderPrice"
                value={formatCurrency(input.leaderPrice || 0)}
                onChange={handleNumber}
                min={0}
                step={1}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="Diária revenda">
          <Row gutter={10}>
            <Col md={8}>
              <Input
                name="retailPrice"
                value={formatCurrency(input.retailPrice || 0)}
                onChange={handleNumber}
                min={0}
                step={1}
              />
            </Col>
          </Row>
        </Form.Item>
      </InnerForm>
    </Modal>
  )
}

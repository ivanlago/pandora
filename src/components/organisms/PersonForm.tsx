import {
  Button,
  Form,
  Icon,
  Input,
  message,
  Modal,
  Select,
  Steps,
  Upload
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { RcFile, UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import axios from 'axios'
import * as React from 'react'
import InputMask from 'react-input-mask'
import { Person } from '../../generated/graphql'
import { CrudModal } from '../../util/crud'
import { InnerForm } from '../atoms/InnerForm'

interface IProps extends CrudModal<Person> {
  entity?: Person
}

export const PersonForm: React.FunctionComponent<IProps> = ({
  entity,
  onOk,
  onCancel
}) => {
  const [step, setStep] = React.useState(0)

  const [loading, setLoading] = React.useState(false)
  const [input, setInput] = React.useState<Partial<Person>>(
    entity || {
      name: '',
      department: ''
    }
  )

  const setField = <T extends unknown>(field: string) => (value: T) =>
    setInput({
      ...input,
      [field]: value
    })

  const handleInput = ({
    target
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setField<string>(target.name)(target.value)

  const [uploading, setUploading] = React.useState(false)

  const handleBeforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('A foto precisa estar no formato JPG ou PNG.')
    }
    const isLt10M = file.size / 1024 / 1024 < 10
    if (!isLt10M) {
      message.error('A foto pode ter no máximo 10MB.')
    }
    return isJpgOrPng && isLt10M
  }

  const handleUpload = async (info: UploadChangeParam<UploadFile<any>>) => {
    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('image', info.file.originFileObj!)

      const { data } = await axios.post(
        'https://api.imgur.com/3/image',
        formData,
        {
          headers: {
            Authorization: 'Client-ID 033f3950043f9b4',
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      setField('photo')(data?.data?.link)
    } catch (err) {
      console.error(err)
      message.error('Ocorreu um erro ao enviar a foto.')
    } finally {
      setUploading(false)
    }
  }

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
      title={entity ? 'Editar pessoa' : 'Cadastrar pessoa'}
      visible
      onOk={handleOk}
      okText={entity ? 'Salvar alterações' : 'Cadastrar pessoa'}
      confirmLoading={loading}
      onCancel={onCancel}
      cancelText="Cancelar">
      <Steps current={step} style={{ paddingBottom: 32 }}>
        <Steps.Step title="Dados militares" />
        <Steps.Step title="Dados pessoais" />
        <Steps.Step title="Foto" />
      </Steps>
      <InnerForm onOk={handleOk}>
        {step === 0 && (
          <>
            <Form.Item label="Nome de guerra">
              <Input
                name="name"
                value={input.name || ''}
                onChange={handleInput}
              />
            </Form.Item>
            <Form.Item label="BP / Cia">
              <Input
                name="department"
                value={input.department || ''}
                onChange={handleInput}
              />
            </Form.Item>
            <Form.Item label="Graduação / Patente">
              <Select
                value={input.graduation}
                onChange={setField('graduation')}>
                <Select.OptGroup label="Graduações">
                  <Select.Option value="Soldado">Soldado</Select.Option>
                  <Select.Option value="Cabo">Cabo</Select.Option>
                  <Select.Option value="3º Sargento">3º Sargento</Select.Option>
                  <Select.Option value="2º Sargento">2º Sargento</Select.Option>
                  <Select.Option value="1º Sargento">1º Sargento</Select.Option>
                  <Select.Option value="Subtenente">Subtenente</Select.Option>
                </Select.OptGroup>
                <Select.OptGroup label="Patentes">
                  <Select.Option value="2º Tenente">2º Tenente</Select.Option>
                  <Select.Option value="1º Tenente">1º Tenente</Select.Option>
                  <Select.Option value="Capitão">Capitão</Select.Option>
                  <Select.Option value="Major">Major</Select.Option>
                  <Select.Option value="Tenente-coronel">
                    Tenente-coronel
                  </Select.Option>
                  <Select.Option value="Coronel">Coronel</Select.Option>
                </Select.OptGroup>
              </Select>
            </Form.Item>
            <Form.Item label="Cursos">
              <TextArea
                name="courses"
                value={input.courses || ''}
                onChange={handleInput}
              />
            </Form.Item>
          </>
        )}
        {step === 1 && (
          <>
            <Form.Item label="Nome completo">
              <Input
                name="fullName"
                value={input.fullName || ''}
                onChange={handleInput}
              />
            </Form.Item>
            <Form.Item label="Celular (WhatsApp)">
              <InputMask
                mask="(99) 99999-9999"
                value={input.phone || ''}
                onChange={handleInput}>
                {(inputProps: any) => <Input name="phone" {...inputProps} />}
              </InputMask>
            </Form.Item>
            <Form.Item label="RG">
              <InputMask
                mask="99.999.999-99"
                value={input.rg || ''}
                onChange={handleInput}>
                {(inputProps: any) => <Input name="rg" {...inputProps} />}
              </InputMask>
            </Form.Item>
            <Form.Item label="CPF">
              <InputMask
                mask="999.999.999-99"
                value={input.cpf || ''}
                onChange={handleInput}>
                {(inputProps: any) => <Input name="cpf" {...inputProps} />}
              </InputMask>
            </Form.Item>
            <Form.Item label="Dados bancários">
              <TextArea
                name="bankDetails"
                value={input.bankDetails || ''}
                onChange={handleInput}
              />
            </Form.Item>
          </>
        )}
        {step === 2 && (
          <>
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={handleBeforeUpload}
              onChange={handleUpload}>
              {input.photo && !uploading ? (
                <img src={input.photo} alt="Foto" style={{ width: '100%' }} />
              ) : (
                <div>
                  <Icon type={uploading ? 'loading' : 'plus'} />
                  <div className="ant-upload-text">
                    {uploading ? 'Enviando…' : 'Selecionar foto…'}
                  </div>
                </div>
              )}
            </Upload>
          </>
        )}
      </InnerForm>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {step > 0 ? (
          <Button onClick={() => setStep(step => step - 1)}>Anterior</Button>
        ) : (
          <div />
        )}
        {step < 2 && (
          <Button type="primary" onClick={() => setStep(step => step + 1)}>
            Próximo
          </Button>
        )}
      </div>
    </Modal>
  )
}

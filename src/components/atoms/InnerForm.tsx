import * as React from 'react'
import { Form } from 'antd'
import { FormProps } from 'antd/lib/form'

interface IProps extends FormProps {
  onOk: () => void
}

export const InnerForm: React.FunctionComponent<IProps> = ({
  children,
  onOk,
  ...props
}) => (
  <Form
    {...formItemLayout}
    {...props}
    onSubmit={e => {
      e.preventDefault()
      onOk()
    }}
  >
    {children}
    <button type="submit" style={{ display: 'none' }} />
  </Form>
)

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

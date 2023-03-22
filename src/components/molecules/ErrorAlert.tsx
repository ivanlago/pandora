import * as React from 'react'
import { Alert } from 'antd'

export const ErrorAlert: React.FunctionComponent = () => (
  <Alert
    type="error"
    message="Oops! :("
    description="Algo errado ocorreu com a solicitação."
  />
)

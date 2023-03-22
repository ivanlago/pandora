import * as React from 'react'
import { Layout } from 'antd'

export const HeadlessLayout: React.FunctionComponent = ({ children }) => (
  <Layout>{children}</Layout>
)

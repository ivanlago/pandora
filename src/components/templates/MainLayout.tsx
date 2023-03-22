import * as React from 'react'
import { Layout } from 'antd'

interface IProps {
  header: React.ReactNode
  sider: React.ReactNode
  breadcrumb?: React.ReactNode
}

export const MainLayout: React.FunctionComponent<IProps> = ({
  header,
  sider,
  breadcrumb,
  children
}) => (
  <Layout>
    {header}
    <Layout>
      {sider}
      <Layout style={{ padding: '24px' }}>
        {breadcrumb}
        {children}
      </Layout>
    </Layout>
  </Layout>
)

import * as React from 'react'
import { Layout } from 'antd'
const { Content: RawContent } = Layout

export const Content: React.FunctionComponent = ({ children }) => (
  <RawContent
    style={{
      background: '#fff',
      padding: 24,
      margin: 0,
      minHeight: 280
    }}
  >
    {children}
  </RawContent>
)

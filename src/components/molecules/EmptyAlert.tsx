import * as React from 'react'
import { Empty } from 'antd'

export const EmptyAlert: React.FunctionComponent = () => (
  <div style={{ padding: 16 }}>
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  </div>
)

import * as React from 'react'
import { Content } from '../atoms/Content'
import { HeadlessLayout } from '../templates/HeadlessLayout'
import { Spin } from 'antd'

export const Loading: React.FunctionComponent = () => (
  <HeadlessLayout>
    <Content>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Spin size="large" />
      </div>
    </Content>
  </HeadlessLayout>
)

import * as React from 'react'
import { Col } from 'antd'
import { ColProps } from 'antd/lib/col'

export const RightCol: React.FunctionComponent<ColProps> = ({
  style,
  ...props
}) => (
  <Col
    style={{ display: 'flex', justifyContent: 'flex-end', ...style }}
    {...props}
  />
)

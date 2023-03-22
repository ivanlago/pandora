import * as React from 'react'
import { Skeleton, List } from 'antd'
import times from 'ramda/es/times'
import identity from 'ramda/es/identity'

export const PeopleSkeleton: React.FunctionComponent = () => (
  <List>
    {times(identity, 5).map(i => (
      <List.Item key={i}>
        <Skeleton avatar paragraph={false} />
      </List.Item>
    ))}
  </List>
)

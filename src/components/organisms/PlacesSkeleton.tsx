import * as React from 'react'
import { CardGrid } from '../atoms/CardGrid'
import { Card, Icon, Skeleton } from 'antd'
import times from 'ramda/es/times'
import identity from 'ramda/es/identity'

export const PlacesSkeleton: React.FunctionComponent = () => (
  <CardGrid>
    {times(identity, 6).map(i => (
      <Card
        key={i}
        actions={[<Icon type="shop" style={{ visibility: 'hidden' }} />]}
      >
        <Skeleton avatar paragraph={false} />
      </Card>
    ))}
  </CardGrid>
)

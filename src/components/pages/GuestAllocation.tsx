import * as React from 'react'
import { MainLayout } from '../templates/MainLayout'
import { Header } from '../molecules/Header'
import { Sider } from '../molecules/Sider'
import { Content } from '../atoms/Content'
import { Skeleton } from 'antd'
import {
  Allocation,
  ListMyAllocationsComponent,
  MeComponent
} from '../../generated/graphql'
import moment = require('moment')
import { Moment } from 'moment'
import { AllocationsEditor } from '../organisms/AllocationsEditor'

export const GuestAllocation: React.FunctionComponent = () => {
  const [date, setDate] = React.useState<Moment>(moment())
  const it = date.clone()
  const variables = {
    from: it.startOf('month').format('YYYY-MM-DD'),
    to: it.endOf('month').format('YYYY-MM-DD')
  }

  return (
    <MainLayout
      header={<Header />}
      sider={<Sider path={['allocation', 'list']} />}
    >
      <Content>
        <MeComponent>
          {({ loading: meLoading, data: meData }) => (
            <ListMyAllocationsComponent variables={variables}>
              {({ loading, data }) =>
                loading || meLoading ? (
                  <Skeleton />
                ) : (
                  <AllocationsEditor
                    headcount={meData!.me!.place!.headcount}
                    allocations={data!.listMyAllocations as Allocation[]}
                    loading={loading}
                    date={date}
                    onChange={setDate}
                    readOnly
                  />
                )
              }
            </ListMyAllocationsComponent>
          )}
        </MeComponent>
      </Content>
    </MainLayout>
  )
}

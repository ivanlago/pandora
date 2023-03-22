import { Button, Col, message, Row, Skeleton } from 'antd'
import { Moment } from 'moment'
import nth from 'ramda/es/nth'
import * as React from 'react'
import {
  ListMyAllocationsComponent,
  MeComponent,
  MyAllocation,
  MyPlace
} from '../../generated/graphql'
import { tableToExcel } from '../../util/excel'
import { Content } from '../atoms/Content'
import { RightCol } from '../atoms/RightCol'
import { ErrorAlert } from '../molecules/ErrorAlert'
import { Header } from '../molecules/Header'
import { MonthSelector } from '../molecules/MonthSelector'
import { Sider } from '../molecules/Sider'
import { AllocationsReport } from '../organisms/AllocationsReport'
import { MainLayout } from '../templates/MainLayout'
import moment = require('moment')

export const GuestReports: React.FunctionComponent = () => {
  const periods: Moment[] = []
  const initial = moment('2014-12-01')
  while (initial.isSameOrBefore(moment(), 'month'))
    periods.push(initial.add(1, 'month').clone())

  const [period, setPeriod] = React.useState<Moment>(nth(-3, periods)!)

  const it = period.clone()
  const variables = {
    from: it.format('YYYY-MM-DD'),
    to: it.endOf('month').format('YYYY-MM-DD')
  }

  const ref = React.useRef<HTMLDivElement>(null)

  const handleExport = () => {
    const div = ref.current
    const table = div && div.querySelector('table')
    if (table)
      tableToExcel(
        table,
        `${period.format('YYYY-MM')} - ${div!.dataset.place}.xlsx`
      )
    else message.error('Não há tabela para ser exportada.')
  }

  return (
    <MainLayout
      header={<Header />}
      sider={<Sider path={['reports', 'list']} />}>
      <Content>
        <Row style={{ marginBottom: 24 }}>
          <Col span={16}>
            <MonthSelector
              periods={periods}
              value={period}
              onChange={setPeriod}
            />
          </Col>
          <RightCol span={8}>
            <Button icon="export" onClick={handleExport}>
              Exportar para Excel
            </Button>
          </RightCol>
        </Row>
        <MeComponent>
          {({ loading: meLoading, error: meError, data: meData }) => (
            <ListMyAllocationsComponent variables={variables}>
              {({ loading, error, data }) =>
                loading || meLoading ? (
                  <Skeleton />
                ) : error || meError ? (
                  <ErrorAlert />
                ) : (
                  <AllocationsReport
                    tableRef={ref}
                    group={meData!.me!.group}
                    place={meData!.me!.place as MyPlace}
                    allocations={data!.listMyAllocations! as MyAllocation[]}
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

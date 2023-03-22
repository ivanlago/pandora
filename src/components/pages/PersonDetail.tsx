import {
  Button,
  Col,
  message,
  notification,
  PageHeader,
  Row,
  Skeleton
} from 'antd'
import { Moment } from 'moment'
import nth from 'ramda/es/nth'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import {
  Allocation,
  Person,
  useGetPersonQuery,
  useListPersonAllocationsQuery
} from '../../generated/graphql'
import { tableToExcel } from '../../util/excel'
import { route } from '../../util/routes'
import { Content } from '../atoms/Content'
import { RightCol } from '../atoms/RightCol'
import { ErrorAlert } from '../molecules/ErrorAlert'
import { Header } from '../molecules/Header'
import { MonthSelector } from '../molecules/MonthSelector'
import { Sider } from '../molecules/Sider'
import { PersonReport } from '../organisms/PersonReport'
import { MainLayout } from '../templates/MainLayout'
import moment = require('moment')

interface IParams {
  id: string
}

export const PersonDetail: React.FunctionComponent<
  RouteComponentProps<IParams>
> = ({
  match: {
    params: { id }
  },
  history
}) => {
  const periods: Moment[] = []
  const initial = moment('2014-12-01')
  while (initial.isSameOrBefore(moment(), 'month'))
    periods.push(initial.add(1, 'month').clone())

  const [period, setPeriod] = React.useState<Moment>(nth(-3, periods)!)

  const { loading, error, data } = useGetPersonQuery({
    variables: {
      id
    }
  })
  const it = period.clone()
  const {
    loading: loadingReport,
    error: errorReport,
    data: dataReport
  } = useListPersonAllocationsQuery({
    variables: {
      person: id,
      from: it.format('YYYY-MM-DD'),
      to: it.endOf('month').format('YYYY-MM-DD')
    }
  })

  const handleBack = () => {
    history.push(route('people'))
    return
  }

  React.useEffect(() => {
    if (!loading && !data) {
      notification.error({
        message: 'Oops! :(',
        description: 'Esta pessoa não existe mais.'
      })
      handleBack()
    }
  }, [loading, data])

  const ref = React.useRef<HTMLDivElement>(null)

  const handleExport = () => {
    const div = ref.current
    const table = div && div.querySelector('table')
    if (table)
      tableToExcel(
        table,
        `${period.format('YYYY-MM')} - ${div!.dataset.person}.xlsx`
      )
    else message.error('Não há tabela para ser exportada.')
  }

  return (
    <MainLayout header={<Header />} sider={<Sider path={['people', 'list']} />}>
      <Content>
        {loading ? (
          <Skeleton />
        ) : error || !data ? (
          <ErrorAlert />
        ) : (
          <>
            <PageHeader
              title={(data.getPerson && data.getPerson.name) || ''}
              subTitle={(data.getPerson && data.getPerson.department) || ''}
              onBack={handleBack}
              style={{ padding: 0, marginBottom: 24 }}
            />
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
            {loadingReport ? (
              <Skeleton />
            ) : errorReport ? (
              <ErrorAlert />
            ) : (
              <PersonReport
                allocations={dataReport!.listPersonAllocations as Allocation[]}
                person={data!.getPerson as Person}
                tableRef={ref}
              />
            )}
          </>
        )}
      </Content>
    </MainLayout>
  )
}

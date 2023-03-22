import { Col, Row, Statistic, Table } from 'antd'
import filter from 'ramda/es/filter'
import pluck from 'ramda/es/pluck'
import sum from 'ramda/es/sum'
import uniq from 'ramda/es/uniq'
import * as React from 'react'
import { Allocation, Person } from '../../generated/graphql'
import { daysOfMonth } from '../../util/date'
import { formatCurrency } from '../../util/format'
import { EmptyAlert } from '../molecules/EmptyAlert'
import moment = require('moment')

interface IProps {
  person: Person
  allocations: Allocation[]
  tableRef?: React.RefObject<HTMLDivElement>
}

export const PersonReport: React.FunctionComponent<IProps> = ({
  person,
  allocations,
  tableRef
}) => {
  if (!allocations.length) return <EmptyAlert />

  const sample = allocations[0]
  const month = moment(sample.date)
  const days = daysOfMonth(month)

  const data = days.map(date => {
    const day = date.format('DD')
    const allocation = allocations.find(_ => date.isSame(_.date, 'day'))
    const place = allocation && allocation.place.name
    const leader =
      allocation &&
      allocation.people[0] &&
      allocation.people[0].id === person.id
    const price = allocation
      ? leader
        ? allocation.place.leaderPrice
        : allocation.place.personPrice
      : 0
    return {
      day,
      allocation,
      place,
      leader,
      price
    }
  })

  const dataSource = data.map(row => ({
    ...row,
    place: row.place || '-',
    leader: row.allocation ? (row.leader ? 'Sim' : 'Não') : '-',
    price: row.allocation ? formatCurrency(row.price) : '-'
  }))

  const worked = filter(row => !!row.allocation, data)
  const count = worked.length
  const leader = filter(row => !!row.leader, worked).length
  const places = uniq(pluck('place', worked)).length
  const paycheck = sum(pluck('price', worked))

  return (
    <>
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Statistic
            title="Estabelecimentos"
            value={places + (places === 1 ? ' local' : ' locais')}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Diárias"
            value={count + (count === 1 ? ' dia' : ' dias')}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Líder"
            value={leader + (leader === 1 ? ' vez' : ' vezes')}
          />
        </Col>

        <Col span={6}>
          <Statistic title="Pagamento" value={formatCurrency(paycheck)} />
        </Col>
      </Row>
      <div ref={tableRef} data-person={person.name}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          size="small"
        />
      </div>
    </>
  )
}

const columns = [
  {
    title: 'Dia',
    dataIndex: 'day',
    key: 'day'
  },
  {
    title: 'Estabelecimento',
    dataIndex: 'place',
    key: 'place'
  },
  {
    title: 'Líder',
    dataIndex: 'leader',
    key: 'leader'
  },
  {
    title: 'Diária',
    dataIndex: 'price',
    key: 'price'
  }
]

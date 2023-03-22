import * as React from 'react'
import {
  Allocation,
  Place,
  UserGroup,
  MyPlace,
  MyAllocation
} from '../../generated/graphql'
import { Table, Row, Col, Statistic } from 'antd'
import { EmptyAlert } from '../molecules/EmptyAlert'
import moment = require('moment')
import { formatCurrency, formatCurrencyNoPrefix } from '../../util/format'
import { daysOfMonth } from '../../util/date'
import sum from 'ramda/es/sum'
import pluck from 'ramda/es/pluck'
import prop from 'ramda/es/prop'
import head from 'ramda/es/head'
import sort from 'ramda/es/sort'
import ascend from 'ramda/es/ascend'
import last from 'ramda/es/last'
import { ColumnProps } from 'antd/lib/table'

interface IProps {
  group: UserGroup
  place: Place | MyPlace
  allocations: Allocation[] | MyAllocation[]
  tableRef?: React.RefObject<HTMLDivElement>
}

export const AllocationsReport: React.FunctionComponent<IProps> = ({
  group,
  place,
  allocations,
  tableRef
}) => {
  if (!allocations.length) return <EmptyAlert />

  const sample = allocations[0]
  const month = moment(sample.date)
  const days = daysOfMonth(month)

  const columns = columnGroups[group === UserGroup.Admins ? 'admin' : 'guest']

  const dataSource = days.map(date => {
    const allocation = (allocations as MyAllocation[]).find(_ =>
      date.isSame(_.date, 'day')
    )
    const day = date.format('DD')
    const headcount = allocation ? allocation.people.length : 0

    let row = {
      key: day,
      day,
      headcount
    }

    if (group === UserGroup.Admins) {
      const { personPrice, leaderPrice, retailPrice } = place as Place
      const expenses = headcount
        ? personPrice * (headcount - 1) + leaderPrice
        : 0
      const revenue = headcount * retailPrice
      const profit = revenue - expenses

      return {
        ...row,
        personPrice: formatCurrency(personPrice),
        leaderPrice: formatCurrency(leaderPrice),
        retailPrice: formatCurrency(retailPrice),
        _expenses: expenses,
        expenses: formatCurrency(expenses),
        _revenue: revenue,
        revenue: formatCurrency(revenue),
        profit: formatCurrency(profit)
      }
    } else {
      const { retailPrice } = place as MyPlace
      const expenses = headcount * retailPrice

      return {
        ...row,
        retailPrice: formatCurrency(retailPrice),
        _expenses: expenses,
        expenses: formatCurrency(expenses)
      }
    }
  })

  const byHeadcount = sort(ascend(prop('headcount')))(dataSource)
  const minHeadcount = head(byHeadcount).headcount
  const maxHeadcount = last(byHeadcount).headcount
  const revenue = sum(pluck('_revenue', dataSource as any[]))
  const expenses = sum(pluck('_expenses', dataSource))
  const profit = revenue - expenses

  return (
    <>
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Statistic
            title="Efetivo"
            value={
              minHeadcount +
              (maxHeadcount !== minHeadcount ? '-' + maxHeadcount : '')
            }
            suffix="seguranças/dia"
          />
        </Col>
        {group === UserGroup.Admins ? (
          <>
            <Col span={6}>
              <Statistic
                title="Receita"
                value={formatCurrencyNoPrefix(revenue.toFixed())}
                prefix="R$"
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Despesas"
                value={formatCurrencyNoPrefix(expenses.toFixed())}
                prefix="R$"
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Lucro"
                value={formatCurrencyNoPrefix(profit.toFixed())}
                prefix="R$"
              />
            </Col>
          </>
        ) : (
          <Statistic
            title="Fatura"
            value={formatCurrencyNoPrefix(expenses.toFixed())}
            prefix="R$"
          />
        )}
      </Row>
      <div ref={tableRef} data-place={place.name}>
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

const columnGroups: { [key: string]: ColumnProps<any>[] } = {
  admin: [
    {
      title: 'Dia',
      dataIndex: 'day',
      key: 'day'
    },
    {
      title: 'Efetivo',
      dataIndex: 'headcount',
      key: 'headcount'
    },
    {
      title: 'Diária',
      dataIndex: 'personPrice',
      key: 'personPrice'
    },
    {
      title: 'Diária líder',
      dataIndex: 'leaderPrice',
      key: 'leaderPrice'
    },
    {
      title: 'Diária revenda',
      dataIndex: 'retailPrice',
      key: 'retailPrice'
    },
    {
      title: 'Despesas',
      dataIndex: 'expenses',
      key: 'expenses'
    },
    {
      title: 'Receita',
      dataIndex: 'revenue',
      key: 'revenue'
    },
    {
      title: 'Lucro líquido',
      dataIndex: 'profit',
      key: 'profit'
    }
  ],
  guest: [
    {
      title: 'Dia',
      dataIndex: 'day',
      key: 'day'
    },
    {
      title: 'Efetivo',
      dataIndex: 'headcount',
      key: 'headcount'
    },
    {
      title: 'Custo por segurança',
      dataIndex: 'retailPrice',
      key: 'retailPrice'
    },
    {
      title: 'Custo total',
      dataIndex: 'expenses',
      key: 'expenses'
    }
  ]
}

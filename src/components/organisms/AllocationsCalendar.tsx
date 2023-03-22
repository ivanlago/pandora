import { Calendar, Icon, Spin } from 'antd'
import { IconProps } from 'antd/lib/icon'
import { Moment } from 'moment'
import * as React from 'react'
import { Allocation } from '../../generated/graphql'

interface IProps {
  headcount: number
  allocations: Allocation[]
  loading: boolean
  value: Moment
  onChange: (value: Moment) => void
}

export const AllocationsCalendar: React.FunctionComponent<IProps> = ({
  allocations,
  loading,
  value,
  onChange,
  headcount
}) => {
  const AllocationIndicator = ({ date }: { date: Moment }) => {
    const allocation = allocations.find(allocation =>
      date.isSame(allocation.date, 'day')
    )
    const count = allocation ? allocation.people.length : 0
    const props: IconProps =
      count >= headcount
        ? {
            type: 'check-circle',
            twoToneColor: 'green'
          }
        : count > headcount / 2
        ? {
            type: 'minus-circle',
            twoToneColor: 'yellow'
          }
        : {
            type: 'exclamation-circle',
            twoToneColor: 'red'
          }

    return <Icon {...props} theme='twoTone' title={count + ' alocações'} />
  }

  return (
    <Spin spinning={loading}>
      <Calendar
        fullscreen={false}
        value={value}
        onChange={onChange}
        dateCellRender={date =>
          date.isSame(value, 'month') && <AllocationIndicator date={date} />
        }
      />
    </Spin>
  )
}

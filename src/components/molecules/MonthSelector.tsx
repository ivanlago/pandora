import * as React from 'react'
import { Moment } from 'moment'
import { Select } from 'antd'
import moment = require('moment')
import groupBy from 'ramda/es/groupBy'
import pipe from 'ramda/es/pipe'
import keys from 'ramda/es/keys'
import map from 'ramda/es/map'
import sort from 'ramda/es/sort'
import filter from 'ramda/es/filter'
import last from 'ramda/es/last'
import compose from 'ramda/es/compose'

interface IProps {
  periods: Moment[]
  value: Moment
  onChange: (value: Moment) => void
}

export const MonthSelector: React.FunctionComponent<IProps> = ({
  periods,
  value,
  onChange
}) => {
  const year = (date: Moment) => date.format('YYYY')
  const month = (date: Moment) => date.format('MMMM')
  const iso = (date: Moment) => date.toISOString()
  const datefy = (year: string) => moment(year + '-01-01')
  const sortAsc = sort<Moment>((a, b) => (a.isAfter(b) ? 1 : -1))
  const monthsFromYear = (date: Moment) =>
    filter<Moment>(m => m.isSame(date, 'year'))(periods)
  const highest = (dates: Moment[]) =>
    compose(
      last,
      sortAsc
    )(dates)

  const years = pipe(
    groupBy(year),
    keys,
    map(datefy),
    sortAsc,
    map(year)
  )(periods)

  const months = compose(
    sortAsc,
    monthsFromYear
  )(value)

  const handleYear = compose(
    onChange,
    highest,
    monthsFromYear,
    datefy
  )

  const handleMonth = (value: string) => onChange(moment(value))

  return (
    <>
      <Select
        value={year(value)}
        onChange={handleYear}
        style={{ width: 80, marginRight: 12 }}
      >
        {years.map(year => (
          <Select.Option key={year} value={year}>
            {year}
          </Select.Option>
        ))}
      </Select>

      <Select value={iso(value)} onChange={handleMonth} style={{ width: 120 }}>
        {months.map(date => (
          <Select.Option key={iso(date)} value={iso(date)}>
            {month(date)}
          </Select.Option>
        ))}
      </Select>
    </>
  )
}

import { Moment } from 'moment'

export const daysOfMonth = (date: Moment) => {
  const start = date.clone().startOf('month')
  const end = date.clone().endOf('month')
  const days = [start.clone()]
  while (start.isBefore(end, 'day')) days.push(start.add(1, 'day').clone())
  return days
}

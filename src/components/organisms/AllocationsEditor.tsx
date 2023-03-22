import { MutationUpdaterFn } from 'apollo-boost'
import { Moment } from 'moment'
import * as React from 'react'
import { Allocation, ListAllocationsDocument } from '../../generated/graphql'
import { AllocationsCalendar } from './AllocationsCalendar'
import { Allocator } from './Allocator'

interface IProps {
  headcount: number
  allocations: Allocation[]
  loading: boolean
  date: Moment
  onChange: (date: Moment) => void
  onSave?: (
    date: string,
    people: string[],
    updateHandler?: (variables: any) => MutationUpdaterFn,
    optimisticResponse?: Allocation
  ) => void
  readOnly?: boolean
}

export const AllocationsEditor: React.FunctionComponent<IProps> = ({
  allocations,
  date,
  onChange,
  loading,
  onSave,
  readOnly,
  headcount
}) => {
  const allocation = React.useMemo(
    () => allocations.find(allocation => date.isSame(allocation.date, 'day')),
    [allocations, date]
  )

  const handleAllocator = (people: string[]) => {
    const updatedAllocation: Allocation = {
      ...allocation!,
      people: people.map(id => {
        const person = allocation!?.people.find(person => person.id === id)
        return {
          __typename: 'Person',
          id,
          name: '',
          department: '',
          ...(person || {})
        }
      })
    }
    onSave!(
      date.format('YYYY-MM-DD'),
      people,
      variables => proxy => {
        const data = proxy.readQuery({
          query: ListAllocationsDocument,
          variables
        }) as { listAllocations: Allocation[] }
        const listAllocations = data.listAllocations.map(allocation =>
          date.isSame(allocation.date, 'day') ? updatedAllocation : allocation
        )
        proxy.writeQuery({
          query: ListAllocationsDocument,
          variables,
          data: {
            listAllocations
          }
        })
      },
      updatedAllocation
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        margin: -12
      }}
    >
      <div
        style={{
          flex: '0 0 300px',
          padding: 12
        }}
      >
        <AllocationsCalendar
          headcount={headcount}
          allocations={allocations as Allocation[]}
          loading={loading}
          value={date}
          onChange={onChange}
        />
      </div>
      <div style={{ flex: '1 0 300px', padding: 12 }}>
        <Allocator
          headcount={headcount}
          people={allocation?.people || []}
          loading={loading}
          onChange={handleAllocator}
          readOnly={readOnly}
        />
      </div>
    </div>
  )
}

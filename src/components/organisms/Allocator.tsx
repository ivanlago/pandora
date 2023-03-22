import { Col, Modal, Row, Select, Typography } from 'antd'
import Text from 'antd/lib/typography/Text'
import * as R from 'ramda'
import * as React from 'react'
import { ListPeopleComponent, Person } from '../../generated/graphql'
import { lowerContains } from '../../util/filter'
import { ButtonBar } from '../atoms/ButtonBar'
import { RightCol } from '../atoms/RightCol'
import { DraggableCard } from '../molecules/DraggableCard'
import { EmptyAlert } from '../molecules/EmptyAlert'

interface IProps {
  headcount: number
  people: Person[]
  loading: boolean
  onChange: (people: string[]) => void
  readOnly?: boolean
}

export const Allocator: React.FunctionComponent<IProps> = ({
  headcount,
  people,
  loading,
  onChange,
  readOnly
}) => {
  const [person, setPerson] = React.useState<string | undefined>(undefined)
  const allocated = React.useMemo(() => R.pluck('id', people), [people])

  const isAvailable = (person: Person) => !R.includes(person.id)(allocated)
  const takeOff = (person: Person) => R.reject(R.equals(person.id), allocated)

  React.useEffect(() => {
    if (person && allocated.includes(person)) setPerson(undefined)
  }, [people])

  const handleSelect = (id: string) => {
    setPerson(id)
    onChange([...allocated, id!])
  }
  const handleCrown = (person: Person) => () =>
    onChange([person.id, ...takeOff(person)])
  const handleDisallocate = (person: Person) => () => onChange(takeOff(person))
  const handlePhoto = (person: Person) => () =>
    Modal.info({
      title: person.photo ? `Foto de ${person.name}` : 'Oops!',
      content: person.photo ? (
        <img
          src={person.photo}
          alt={`Foto de ${person.name}`}
          style={{ width: '100%' }}
        />
      ) : (
        `${person.name} não tem foto cadastrada.`
      ),
      okText: 'Certo!'
    })
  const handleDrop = React.useCallback(
    (targetPerson: Person, droppedPerson: Person) => {
      const targetIndex = allocated.indexOf(targetPerson.id)
      const droppedIndex = allocated.indexOf(droppedPerson.id)
      const swapped = R.pipe(
        R.set(R.lensIndex(targetIndex), droppedPerson.id),
        R.set(R.lensIndex(droppedIndex), targetPerson.id)
      )(allocated)

      onChange(swapped)
    },
    [allocated]
  )

  const handleFilter = (inputValue: string, option: React.ReactElement) => {
    const parts = option.props.children as React.Component[]
    const name = parts[0]!.props.children as string
    const department = parts[1]!.props.children as string[]
    const text = [name, ...department].join('')
    return lowerContains(inputValue)(text)
  }

  return (
    <>
      <Row style={{ marginBottom: 24 }}>
        <Col span={8} style={{ lineHeight: '32px' }}>
          Alocadas {people.length} de {headcount} pessoas
        </Col>
        <RightCol span={16}>
          {!readOnly && (
            <ButtonBar
              buttons={[
                <ListPeopleComponent>
                  {({ loading: loadingPeople, error, data }) => (
                    <Select
                      showSearch
                      placeholder='Selecione uma pessoa para alocar'
                      value={person}
                      loading={loading || loadingPeople || !!person}
                      optionFilterProp='children'
                      filterOption={handleFilter}
                      onChange={handleSelect}
                      style={{ width: 300 }}
                    >
                      {!loadingPeople &&
                        !error &&
                        data!
                          .listPeople!.items!.filter(isAvailable)
                          .map(person => (
                            <Select.Option key={person!.id} value={person!.id}>
                              {/* {person!.name} */}
                              <Text>{person!.name}</Text>
                              <Text type='secondary'>
                                {' '}
                                / {person!.department}
                              </Text>
                            </Select.Option>
                          ))}
                    </Select>
                  )}
                </ListPeopleComponent>
              ]}
            />
          )}
        </RightCol>
      </Row>

      {people.length ? (
        <>
          <Typography.Title level={4}>Efetivo</Typography.Title>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'min-content',
              gridGap: 12
            }}
          >
            {people.slice(0, headcount).map((person, index) => (
              <DraggableCard
                key={person.name}
                index={index}
                person={person}
                readOnly={readOnly}
                onClickCrown={handleCrown}
                onClickViewPhoto={handlePhoto}
                onClickDisallocate={handleDisallocate}
                onDrop={handleDrop}
              />
            ))}
          </div>

          {people.length > headcount && (
            <>
              <Typography.Title level={4} style={{ marginTop: 32 }}>
                Suplentes
              </Typography.Title>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gridTemplateRows: 'min-content',
                  gridGap: 12
                }}
              >
                {people.slice(headcount).map((person, index) => (
                  <DraggableCard
                    additional
                    key={person.name}
                    index={index}
                    person={person}
                    readOnly={readOnly}
                    onClickViewPhoto={handlePhoto}
                    onClickDisallocate={handleDisallocate}
                    onDrop={handleDrop}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <EmptyAlert />
      )}
    </>
  )
}

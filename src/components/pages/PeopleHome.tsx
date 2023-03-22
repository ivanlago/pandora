import { Button, Col, Row } from 'antd'
import Search from 'antd/lib/input/Search'
import * as React from 'react'
import {
  CreatePersonComponent,
  DeletePersonComponent,
  ListPeopleComponent,
  Person,
  UpdatePersonComponent
} from '../../generated/graphql'
import { generateCRUD } from '../../util/crud'
import { searchBy } from '../../util/filter'
import { useModal } from '../../util/modal'
import { ButtonBar } from '../atoms/ButtonBar'
import { Content } from '../atoms/Content'
import { RightCol } from '../atoms/RightCol'
import { ErrorAlert } from '../molecules/ErrorAlert'
import { Header } from '../molecules/Header'
import { Sider } from '../molecules/Sider'
import { PeopleList } from '../organisms/PeopleList'
import { PeopleSkeleton } from '../organisms/PeopleSkeleton'
import { PersonForm } from '../organisms/PersonForm'
import { MainLayout } from '../templates/MainLayout'

export const PeopleHome: React.FunctionComponent = () => {
  const [search, setSearch] = React.useState('')
  const searchFilter = searchBy<Person>('name', 'department')(search)

  const [EditModal, showEditModal] = useModal(PersonForm)
  const { create, update, remove } = generateCRUD<Person>({
    entityName: 'Pessoa',
    entityArticle: 'a',
    editModal: showEditModal,
    refetch: 'listPeople'
  })

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value)

  return (
    <MainLayout header={<Header />} sider={<Sider path={['people', 'list']} />}>
      <Content>
        <Row style={{ marginBottom: 24 }}>
          <Col span={8}>
            <Search
              placeholder="Pesquisar por nome, batalhão e/ou companhia"
              onChange={handleSearch}
            />
          </Col>
          <RightCol span={16}>
            <ButtonBar
              buttons={[
                <CreatePersonComponent>
                  {createPerson => (
                    <Button type="primary" onClick={() => create(createPerson)}>
                      Cadastrar pessoa
                    </Button>
                  )}
                </CreatePersonComponent>,
                <Button disabled>Exportar</Button>
              ]}
            />
          </RightCol>
        </Row>
        <ListPeopleComponent>
          {({ loading, error, data }) =>
            loading ? (
              <PeopleSkeleton />
            ) : error ? (
              <ErrorAlert />
            ) : (
              <UpdatePersonComponent>
                {updatePerson => (
                  <DeletePersonComponent>
                    {deletePerson => (
                      <PeopleList
                        people={searchFilter(data!.listPeople!
                          .items as Person[])}
                        onEdit={person => update(updatePerson, person!)}
                        onDelete={person => remove(deletePerson, person!)}
                      />
                    )}
                  </DeletePersonComponent>
                )}
              </UpdatePersonComponent>
            )
          }
        </ListPeopleComponent>
      </Content>
      <EditModal />
    </MainLayout>
  )
}

import { Button, Col, Input, Row } from 'antd'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import {
  CreatePlaceComponent,
  DeletePlaceComponent,
  ListPlacesComponent,
  Place,
  UpdatePlaceComponent
} from '../../generated/graphql'
import { generateCRUD } from '../../util/crud'
import { searchBy } from '../../util/filter'
import { useModal } from '../../util/modal'
import { route } from '../../util/routes'
import { ButtonBar } from '../atoms/ButtonBar'
import { Content } from '../atoms/Content'
import { RightCol } from '../atoms/RightCol'
import { EmptyAlert } from '../molecules/EmptyAlert'
import { ErrorAlert } from '../molecules/ErrorAlert'
import { Header } from '../molecules/Header'
import { Sider } from '../molecules/Sider'
import { PlaceForm } from '../organisms/PlaceForm'
import { PlacesList } from '../organisms/PlacesList'
import { PlacesSkeleton } from '../organisms/PlacesSkeleton'
import { MainLayout } from '../templates/MainLayout'

export const PlacesHome: React.FunctionComponent<RouteComponentProps> = ({
  history
}) => {
  const [search, setSearch] = React.useState('')
  const searchByName = searchBy<Place>('name')(search)

  const [EditModal, showEditModal] = useModal(PlaceForm)
  const { create, update, remove } = generateCRUD<Place>({
    entityName: 'Estabelecimento',
    entityArticle: 'o',
    editModal: showEditModal,
    refetch: 'listPlaces'
  })

  const open = (place: Place) => {
    history.push(route('place-allocation', { id: place.id }))
  }

  const report = (place: Place) => {
    history.push(route('reports', { place: place.id }))
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value)

  return (
    <MainLayout header={<Header />} sider={<Sider path={['places', 'list']} />}>
      <Content>
        <Row style={{ marginBottom: 24 }}>
          <Col span={8}>
            <Input.Search
              placeholder="Pesquisar por nome"
              onChange={handleSearch}
            />
          </Col>
          <RightCol span={16}>
            <ButtonBar
              buttons={[
                <CreatePlaceComponent>
                  {createPlace => (
                    <Button type="primary" onClick={() => create(createPlace)}>
                      Novo estabelecimento
                    </Button>
                  )}
                </CreatePlaceComponent>,
                <Button disabled>Exportar</Button>
              ]}
            />
          </RightCol>
        </Row>
        <ListPlacesComponent>
          {({ loading, error, data }) => {
            if (loading) return <PlacesSkeleton />
            if (error) return <ErrorAlert />

            const places = searchByName(data!.listPlaces!.items as Place[])
            if (!places.length) return <EmptyAlert />

            return (
              <UpdatePlaceComponent>
                {updatePlace => (
                  <DeletePlaceComponent>
                    {deletePlace => (
                      <PlacesList
                        places={places}
                        onOpen={open}
                        onReport={report}
                        onEdit={place => update(updatePlace, place!)}
                        onDelete={place => remove(deletePlace, place!)}
                      />
                    )}
                  </DeletePlaceComponent>
                )}
              </UpdatePlaceComponent>
            )
          }}
        </ListPlacesComponent>
      </Content>
      <EditModal />
    </MainLayout>
  )
}

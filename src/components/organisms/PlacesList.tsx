import { Avatar, Card, Icon } from 'antd'
import ascend from 'ramda/es/ascend'
import prop from 'ramda/es/prop'
import sort from 'ramda/es/sort'
import * as React from 'react'
import { Place } from '../../generated/graphql'
import { CardGrid } from '../atoms/CardGrid'

interface IProps {
  places: Place[]
  onReport: (place: Place) => void
  onOpen: (place: Place) => void
  onEdit: (place: Place) => void
  onDelete: (place: Place) => void
}

export const PlacesList: React.FunctionComponent<IProps> = ({
  places,
  onReport,
  onOpen,
  onEdit,
  onDelete
}) => {
  const sortedPlaces = sort(ascend(prop('name')), places)

  const unbubble = (callback: () => void) => (event: React.MouseEvent) => {
    event.stopPropagation()
    callback()
  }

  return (
    <CardGrid>
      {sortedPlaces.map(place => (
        <Card
          key={place!.id}
          hoverable
          onClick={() => onOpen(place)}
          actions={[
            <Icon type="calendar" title="Alocação" />,
            <Icon
              type="line-chart"
              title="Relatório"
              onClick={unbubble(() => onReport(place))}
            />,
            <Icon
              type="edit"
              title="Editar"
              onClick={unbubble(() => onEdit(place))}
            />,
            <Icon
              type="delete"
              title="Excluir"
              onClick={unbubble(() => onDelete(place))}
            />
          ]}>
          <Card.Meta
            avatar={<Avatar alt="Sem foto" icon="shop" />}
            title={place!.name}
            description={place!.headcount + ' seguranças'}
          />
        </Card>
      ))}
    </CardGrid>
  )
}

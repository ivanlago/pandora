import { Avatar, Card, Icon, Tag } from 'antd'
import Meta from 'antd/lib/card/Meta'
import * as React from 'react'
import { useDrag } from 'react-dnd'
import { Person } from '../../generated/graphql'

interface IProps {
  onDrop: (person: Person) => void
}

export const DroppableCardZone: React.FC<IProps> = ({ onDrop }) => {
  const [{ opacity, cursor }, dragRef] = useDrag(
    () => ({
      canDrag: !readOnly,
      type: 'DraggableCard',
      item: person,
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
        cursor: monitor.isDragging() ? 'grabbing' : 'grab'
      })
    }),
    []
  )
  return (
    <div ref={dragRef} style={{ position: 'relative', opacity }}>
      <Card
        key={person.name}
        hoverable={!readOnly}
        style={{ cursor }}
        actions={[
          !!index && !readOnly && (
            <Icon
              type='crown'
              title='Definir como líder'
              onClick={onClickCrown(person)}
            />
          ),
          <Icon
            type='camera'
            title='Ver foto'
            onClick={onClickViewPhoto(person)}
          />,
          !readOnly && (
            <Icon
              type='delete'
              title='Desalocar'
              onClick={onClickDisallocate(person)}
            />
          )
        ].filter(_ => _)}
      >
        <Meta
          avatar={
            <Avatar
              alt={person.photo ? `Foto de ${person.name}` : 'Sem foto'}
              src={person.photo || require('../../../assets/photo.jpg')}
            />
          }
          title={
            <>
              {person.name}
              {!index && (
                <Tag
                  color='blue'
                  style={{
                    position: 'absolute',
                    left: -20,
                    top: 0,
                    transform: 'rotate(-45deg)'
                  }}
                >
                  <Icon type='crown' style={{ marginRight: 5 }} />
                  Líder
                </Tag>
              )}
            </>
          }
          description={person.department}
        />
      </Card>
    </div>
  )
}

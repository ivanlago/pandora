import { Avatar, Card, Icon, Tag } from 'antd'
import Meta from 'antd/lib/card/Meta'
import * as React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Person } from '../../generated/graphql'

interface IProps {
  readOnly?: boolean
  index: number
  person: Person
  additional?: boolean
  onClickCrown?: (person: Person) => React.MouseEventHandler
  onClickViewPhoto: (person: Person) => React.MouseEventHandler
  onClickDisallocate: (person: Person) => React.MouseEventHandler
  onDrop?: (targetPerson: Person, droppedPerson: Person) => void
}

export const DraggableCard: React.FC<IProps> = ({
  index,
  person,
  readOnly,
  additional,
  onClickCrown,
  onClickViewPhoto,
  onClickDisallocate,
  onDrop
}) => {
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

  const [{ background }, dropRef] = useDrop(
    () => ({
      accept: 'DraggableCard',
      canDrop: (item: Person) => item.id !== person.id,
      drop: (item: Person) => {
        onDrop?.(person, item)
      },
      collect: monitor => ({
        background:
          monitor.isOver() && monitor.canDrop() ? '#eeeeee' : 'transparent'
      })
    }),
    [onDrop]
  )

  return (
    <div ref={dropRef}>
      <div ref={dragRef} style={{ position: 'relative', opacity }}>
        <Card
          key={person.name}
          hoverable={!readOnly}
          style={{ cursor, background }}
          actions={[
            !!index && !readOnly && !additional && (
              <Icon
                type='crown'
                title='Definir como líder'
                onClick={onClickCrown?.(person)}
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
                {!index && !additional && (
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
    </div>
  )
}

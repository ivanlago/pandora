import { Avatar, Button, List, Tag } from 'antd'
import ascend from 'ramda/es/ascend'
import prop from 'ramda/es/prop'
import sort from 'ramda/es/sort'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Person } from '../../generated/graphql'
import { route } from '../../util/routes'
const { Item } = List

interface IProps {
  people: Person[]
  onEdit: (person: Person) => void
  onDelete: (person: Person) => void
}

export const PeopleList: React.FunctionComponent<IProps> = ({
  people,
  onEdit,
  onDelete
}) => {
  const sortedPeople = sort(ascend(prop('name')), people)

  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={sortedPeople}
      pagination={{
        position: 'bottom'
      }}
      renderItem={person => (
        <Item
          actions={[
            <Button
              shape="circle"
              icon="edit"
              title="Editar"
              onClick={() => onEdit(person)}
            />,
            <Button
              shape="circle"
              icon="delete"
              title="Excluir"
              onClick={() => onDelete(person)}
            />
          ]}>
          <Item.Meta
            avatar={
              <Avatar
                src={person.photo || require('../../../assets/photo.jpg')}
              />
            }
            title={
              <Link to={route('person-detail', { id: person.id })}>
                {person.name}
              </Link>
            }
            description={person.department || ''}
          />
          <div>
            <Tag color="green">Regular</Tag>
          </div>
        </Item>
      )}
    />
  )
}

import * as React from 'react'
import { List, Avatar, Tag, Icon, Button } from 'antd'
import { User, UserGroup } from '../../generated/graphql'
const { Item } = List

interface IProps {
  users: User[]
  onDelete: (user: User) => void
}

export const UsersList: React.FunctionComponent<IProps> = ({
  users,
  onDelete
}) => (
  <List
    className="demo-loadmore-list"
    itemLayout="horizontal"
    dataSource={users}
    renderItem={user => (
      <Item
        actions={[
          <Button
            shape="circle"
            icon="delete"
            title="Excluir"
            onClick={() => onDelete(user)}
          />
        ]}
      >
        <Item.Meta
          avatar={<Avatar src={require('../../../assets/photo.jpg')} />}
          title={<a href="#">{user.username}</a>}
          description={user.email || ''}
        />
        <div>
          <Tag color={'blue'}>{groups[user.group]}</Tag>
        </div>
      </Item>
    )}
  />
)

const groups: { [key: string]: string } = {
  [UserGroup.Managers]: 'Gerente',
  [UserGroup.Supervisors]: 'Supervisor',
  [UserGroup.Assistants]: 'Assistente Administrativo'
}

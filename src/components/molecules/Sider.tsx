import { Icon, Layout, Menu, Spin } from 'antd'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { MeComponent } from '../../generated/graphql'
import { menu } from '../../util/routes'
const { SubMenu, Item } = Menu
const { Sider: RawSider } = Layout

interface IProps {
  path: string[]
}

export const Sider: React.FunctionComponent<IProps> = ({ path }) => (
  <RawSider width={200} style={{ background: '#fff' }}>
    <MeComponent>
      {({ loading, data }) => {
        if (loading)
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 24
              }}
            >
              <Spin />
            </div>
          )

        const items = menu[data!.me!.group]

        return (
          <Menu
            mode='inline'
            defaultOpenKeys={[path[0]]}
            selectedKeys={[path.join('-')]}
            style={{ height: '100%', borderRight: 0 }}
          >
            {items.map(group =>
              group.items.length === 1 ? (
                <Item key={group.key + '-' + group.items[0].key}>
                  <Link to={group.items[0].path}>
                    <Icon type={group.icon} />
                    {group.label}
                  </Link>
                </Item>
              ) : (
                <SubMenu
                  key={group.key}
                  title={
                    <span>
                      <Icon type={group.icon} />
                      {group.label}
                    </span>
                  }
                >
                  {group.items.map(item => (
                    <Item key={group.key + '-' + item.key}>
                      <Link to={item.path}>{item.label}</Link>
                    </Item>
                  ))}
                </SubMenu>
              )
            )}
          </Menu>
        )
      }}
    </MeComponent>
  </RawSider>
)

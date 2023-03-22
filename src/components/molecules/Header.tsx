import * as React from 'react'
import { Layout, Menu } from 'antd'
import { logout } from '../../util/auth'
const { Header: RawHeader } = Layout

export const Header: React.FunctionComponent = () => (
  <RawHeader className="header">
    <div className="logo" id="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[]}
      style={{ lineHeight: '64px', float: 'right' }}
    >
      <Menu.Item key="1" onClick={logout}>
        Sair
      </Menu.Item>
    </Menu>
  </RawHeader>
)

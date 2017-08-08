import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import { Link } from 'react-router-dom'
import { Row, Col, Layout, Menu, Icon } from 'antd'

import './index.css'

const { Header } = Layout

class HeaderComp extends PureComponent {
  static propTypes = {
    user: object,
  }

  static defaultProps = {
    user: {},
  }

  render() {
    const { user } = this.props

    return (
      <Header>
        <Row gutter={16}>
          <Col className="gutter-row" sm={24} md={6}>
            <h1 className="header-title">
              <Icon
                className="trigger"
                type="menu-unfold"
                onClick={this.toggle}
              />
              <a href="/">FCC VOTING APP</a>
            </h1>
          </Col>
          <Col className="gutter-row" sm={24} md={18}>
            <Menu
              className="header-nav"
              theme="dark"
              mode="horizontal"
            >
              <Menu.SubMenu title={<span><Icon type="user" />{user.displayName}</span>}>
                <Menu.Item key="settings">
                  <Link to="/settings">Settings</Link>
                </Menu.Item>
                <Menu.Item key="logout">
                  <a href="/logout">Log out</a>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Col>
        </Row>
      </Header>
    )
  }
}

export default HeaderComp

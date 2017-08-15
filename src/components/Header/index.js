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
      <Header className="app-header">
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <h1 className="header-title">
              <Link to="/">FCC VOTING APP</Link>
            </h1>
          </Col>
          <Col className="gutter-row header-nav" span={12}>
            {
              user.id ?
                <Menu
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
                :
                <div className="header-nav__login">
                  <Link to="/login">Sign in</Link>
                  &nbsp;&nbsp;or&nbsp;&nbsp;
                  <Link to="/join">Sign up</Link>
                </div>
            }
          </Col>
        </Row>
      </Header>
    )
  }
}

export default HeaderComp

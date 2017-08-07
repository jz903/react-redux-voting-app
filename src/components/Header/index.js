import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'

import './index.css'

class Login extends PureComponent {
  static muiName = 'FlatButton'

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    )
  }
}

const Logged = props => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><AccountCircle /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Settings" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
)

Logged.muiName = 'IconMenu'

class Header extends PureComponent {
  static propTypes = {
    user: object,
  }

  static defaultProps = {
    user: {},
  }

  render() {
    const { user } = this.props
    const isLogged = user && user.id
    return (
      <AppBar
        title="Fcc voting app"
        iconElementRight={isLogged ? <Logged /> : <Login />}
      />
    )
  }
}

export default Header

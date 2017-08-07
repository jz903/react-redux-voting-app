import React, { PureComponent } from 'react'
import { object } from 'prop-types'

import './index.css'

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
      <div>
        {isLogged && <h1>{user.displayName}</h1>}
      </div>
    )
  }
}

export default Header

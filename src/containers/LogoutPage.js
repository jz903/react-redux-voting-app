import React, { PureComponent } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions'

class LogoutPage extends PureComponent {
  static propTypes = {
    logout: func.isRequired,
  }

  componentDidMount() {
    const { logout } = this.props

    logout()
  }

  render() {
    return (
      <div />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(actions.logout())
  },
})

export default connect(null, mapDispatchToProps)(LogoutPage)

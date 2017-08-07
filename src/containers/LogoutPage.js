import React, { PureComponent } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../actions/user'

class LogoutPage extends PureComponent {
  static propTypes = {
    logout: func.isRequired,
  }

  componentDidMount() {
    this.props.logout()
  }

  render() {
    return (
      <div />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout())
  },
})

export default connect(null, mapDispatchToProps)(LogoutPage)

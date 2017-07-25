import React, { PureComponent } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions'
import SignIn from '../components/SignIn'

class SignInPage extends PureComponent {
  static propTypes = {
    signIn: func.isRequired,
  }

  handleSubmit = values => {
    const { signIn } = this.props

    signIn(values)
  }

  render() {
    return (
      <SignIn onSubmit={this.handleSubmit} />
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  signIn: data => {
    dispatch(actions.signIn(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage)

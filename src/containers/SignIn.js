import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import SignIn from '../components/SignIn'

const mapStateToProps = state => ({
  user: state.user,
})

class SignInPage extends PureComponent {
  handleSubmit = values => {
    console.log(values) // eslint-disable-line
  }

  render() {
    return (
      <SignIn onSubmit={this.handleSubmit} />
    )
  }
}

export default connect(mapStateToProps, {})(SignInPage)

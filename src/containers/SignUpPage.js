import React, { PureComponent } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import * as actions from '../actions'
import { API_URL } from '../constants'
import SignUpForm from '../components/SignUpForm'

class SignUpPage extends PureComponent {
  static propTypes = {
    signUp: func.isRequired,
  }

  handleSubmit = values => {
    const { signUp } = this.props

    signUp(values)
  }

  render() {
    return (
      <div className="main-wrapper ui middle aligned center aligned grid">
        <div className="column">
          <Segment stacked>
            <h2 className="ui image header">
              <img src="/assets/images/logo.svg" className="image" alt="logo" />
              <div className="content">
                Sign up your account
              </div>
            </h2>
            <SignUpForm onSubmit={this.handleSubmit} />
          </Segment>
          <div className="ui message">
            Has an account? <Link to="/login">Sign In</Link> <br />
            <a href={`${API_URL}/auth/github`}>Login with Github account</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signUp: data => {
    dispatch(actions.signUp(data))
  },
})

export default connect(null, mapDispatchToProps)(SignUpPage)

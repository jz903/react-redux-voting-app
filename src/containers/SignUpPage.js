import React, { PureComponent } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'

import * as actions from '../actions'
import { API_URL } from '../constants'
import SignUpForm from '../components/SignUpForm'

import './SignPage.css'

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
      <div className="main-wrapper sign-page">
        <div className="sign-page__box">
          <div className="sign-page__nav">
            <Link to="/login">Sign In</Link>
            <Link to="/join">Sign Up</Link>
          </div>
          <div className="sign-page__form">
            <SignUpForm onSubmit={this.handleSubmit} />
            <p>Login with:
              <a
                href={`${API_URL}/auth/github`}
              >
                <IconButton
                  iconClassName="fa fa-github"
                  tooltip="Github"
                />
              </a>
            </p>
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

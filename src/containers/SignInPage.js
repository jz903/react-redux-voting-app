import React, { PureComponent } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'

import { signIn } from '../actions/user'
import SignInForm from '../components/SignInForm'
import { API_URL } from '../constants'
import './SignPage.css'

class SignInPage extends PureComponent {
  static propTypes = {
    signIn: func.isRequired,
  }

  handleSubmit = values => {
    this.props.signIn(values)
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
            <SignInForm onSubmit={this.handleSubmit} />
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
  signIn: data => {
    dispatch(signIn(data))
  },
})

export default connect(null, mapDispatchToProps)(SignInPage)

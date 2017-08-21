import React from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tooltip, Icon } from 'antd'

import { signIn } from '../actions/user'
import SignInForm from '../components/SignInForm'
import { API_URL } from '../constants/urls'
import './SignPage.css'

const SignInPage = props => (
  <div className="main-wrapper sign-page">
    <div className="sign-page__box">
      <div className="sign-page__nav">
        <Link to="/login">Sign In</Link>
        <Link to="/join">Sign Up</Link>
      </div>
      <div className="sign-page__form">
        <SignInForm signIn={props.signIn} />
        <p className="other-login">Login with:
          <Tooltip title="Github account">
            <a href={`${API_URL}/auth/github`} >
              <Icon type="github" />
            </a>
          </Tooltip>
        </p>
      </div>
    </div>
  </div>
)

SignInPage.propTypes = {
  signIn: func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  signIn: data => {
    dispatch(signIn(data))
  },
})

export default connect(null, mapDispatchToProps)(SignInPage)

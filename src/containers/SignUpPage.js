import React from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tooltip, Icon } from 'antd'

import { signUp } from '../actions/user'
import { API_URL } from '../constants'
import SignUpForm from '../components/SignUpForm'

import './SignPage.css'

const SignUpPage = props => (
  <div className="main-wrapper sign-page">
    <div className="sign-page__box">
      <div className="sign-page__nav">
        <Link to="/login">Sign In</Link>
        <Link to="/join">Sign Up</Link>
      </div>
      <div className="sign-page__form">
        <SignUpForm signUp={props.signUp} />
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

SignUpPage.propTypes = {
  signUp: func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  signUp: data => {
    dispatch(signUp(data))
  },
})

export default connect(null, mapDispatchToProps)(SignUpPage)

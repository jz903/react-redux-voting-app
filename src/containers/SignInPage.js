import React, { PureComponent } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import * as actions from '../actions'
import SignInForm from '../components/SignInForm'

import './SignInPage.css'

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
      <div className="main-wrapper ui middle aligned center aligned grid">
        <div className="column">
          <Segment stacked>
            <h2 className="ui image header">
              <img src="/assets/images/logo.svg" className="image" alt="logo" />
              <div className="content">
                Log-in to your account
              </div>
            </h2>
            <SignInForm onSubmit={this.handleSubmit} />
          </Segment>
        </div>
      </div>
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
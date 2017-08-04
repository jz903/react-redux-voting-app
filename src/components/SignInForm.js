import React from 'react'
import { func } from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { RaisedButton } from 'material-ui'

import { TextField } from './form'

const SignIn = ({
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="field">
      <Field name="email" type="email" component={TextField} label="Email" required />
    </div>
    <div className="field">
      <Field name="password" type="password" component={TextField} label="Password" required />
    </div>
    <div className="form-btns">
      <RaisedButton label="Sign In" type="submit" primary fullWidth />
    </div>
  </form>
)

SignIn.propTypes = {
  handleSubmit: func.isRequired,
}

export default reduxForm({
  // a unique name for the form
  form: 'signin',
})(SignIn)

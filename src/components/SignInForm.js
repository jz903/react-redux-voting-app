import React from 'react'
import { func } from 'prop-types'
import { Input, Button, Form } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

import './SignInForm.css'

const SignIn = ({
  handleSubmit,
}) => (
  <Form className="ui large form" onSubmit={handleSubmit}>
    <Form.Field>
      <Field
        icon="mail"
        iconPosition="left"
        name="email"
        component={Input}
        type="email"
        placeholder="E-mail address"
      />
    </Form.Field>
    <Form.Field>
      <Field
        icon="lock"
        iconPosition="left"
        name="password"
        component={Input}
        type="password"
        placeholder="Password"
      />
    </Form.Field>
    <Button primary type="submit">Sign In</Button>
  </Form>
)

SignIn.propTypes = {
  handleSubmit: func.isRequired,
}

export default reduxForm({
  // a unique name for the form
  form: 'signin',
})(SignIn)

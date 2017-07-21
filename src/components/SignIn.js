import React from 'react'
import { func } from 'prop-types'
import { Input, Button, Checkbox, Form, Segment } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

import './SignIn.css'

const SignIn = ({
  handleSubmit,
}) => (
  <div className="main-wrapper ui middle aligned center aligned grid">
    <div className="column">
      <Segment stacked>
        <h2 className="ui image header">
          <img src="/assets/images/logo.svg" className="image" alt="logo" />
          <div className="content">
            Log-in to your account
          </div>
        </h2>
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
          <Form.Field className="remember-field">
            <Checkbox label="Remember me" />
          </Form.Field>
          <Button primary type="submit">Sign In</Button>
        </Form>
      </Segment>
    </div>
  </div>
)

SignIn.propTypes = {
  handleSubmit: func,
}

SignIn.defaultProps = {
  handleSubmit: () => {},
}

export default reduxForm({
  // a unique name for the form
  form: 'signin',
})(SignIn)

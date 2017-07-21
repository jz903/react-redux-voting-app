import React from 'react'
import { Input, Button, Checkbox, Form, Segment } from 'semantic-ui-react'

import './SignIn.css'

const SignIn = () => (
  <div className="main-wrapper ui middle aligned center aligned grid">
    <div className="column">
      <Segment stacked>
        <h2 className="ui image header">
          <img src="/assets/images/logo.svg" className="image" alt="logo" />
          <div className="content">
            Log-in to your account
          </div>
        </h2>
        <Form className="ui large form">
          <Form.Field>
            <Input icon="mail" iconPosition="left" placeholder="E-mail address" />
          </Form.Field>
          <Form.Field>
            <Input icon="lock" iconPosition="left" placeholder="Password" />
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

export default SignIn

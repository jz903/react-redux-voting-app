import React from 'react'
import { func } from 'prop-types'
import { Form, Icon, Input, Button } from 'antd'

const SignUp = ({
  onSubmit,
}) => (
  <Form onSubmit={onSubmit}>
    <Form.Item>
      <Input prefix={<Icon type="user" />} name="displayName" placeholder="Your full name" />
    </Form.Item>
    <Form.Item>
      <Input prefix={<Icon type="user" />} name="username" placeholder="Pickup a username" />
    </Form.Item>
    <Form.Item>
      <Input prefix={<Icon type="mail" />} name="email" type="email" placeholder="Email" />
    </Form.Item>
    <Form.Item>
      <Input prefix={<Icon type="lock" />} name="password" type="password" placeholder="Password" />
    </Form.Item>
    <Button type="primary" htmlType="submit">
      Create An Account
    </Button>
  </Form>
)

SignUp.propTypes = {
  onSubmit: func.isRequired,
}

export default Form.create()(SignUp)

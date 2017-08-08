import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'
import { Form, Icon, Input, Button } from 'antd'

class SignUp extends PureComponent {
  static propTypes = {
    form: object.isRequired,
    signUp: func.isRequired,
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signUp(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('displayName', {
            rules: [{ required: true }],
          })(
            <Input prefix={<Icon type="user" />} placeholder="Your full name" />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true }],
          })(
            <Input prefix={<Icon type="user" />} placeholder="Pickup a username" />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true }],
          })(
            <Input prefix={<Icon type="mail" />} type="email" placeholder="Email" />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true }],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />,
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Create An Account
        </Button>
      </Form>
    )
  }
}

SignUp.propTypes = {
  signUp: func.isRequired,
}

export default Form.create()(SignUp)

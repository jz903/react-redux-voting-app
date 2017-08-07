import React, { Component } from 'react'
import { func } from 'prop-types'
import { Form, Icon, Input, Button } from 'antd'

class SignIn extends Component {
  static propTypes = {
    signIn: func.isRequired,
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }

      this.props.signIn(values)
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          <Input prefix={<Icon type="mail" />} name="email" type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <Input prefix={<Icon type="lock" />} name="password" type="password" placeholder="Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form>
    )
  }
}

export default Form.create()(SignIn)

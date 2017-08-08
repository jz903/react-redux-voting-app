import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'
import { Form, Icon, Input, Button } from 'antd'

class SignIn extends PureComponent {
  static propTypes = {
    form: object.isRequired,
    signIn: func.isRequired,
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signIn(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
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
        <Button type="primary" htmlType="submit" className="form-btn">
          Sign In
        </Button>
      </Form>
    )
  }
}

export default Form.create()(SignIn)

import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'
import { Form, Icon, Input, Button } from 'antd'

class EditUserForm extends PureComponent {
  static propTypes = {
    user: object.isRequired,
    form: object.isRequired,
    editUser: func.isRequired,
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.editUser(values)
      }
    })
  }

  render() {
    const { username, email } = this.props.user
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label="Username"
        >
          <Input disabled value={username} prefix={<Icon type="user" />} placeholder="Pickup a username" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Email"
        >
          <Input disabled value={email} prefix={<Icon type="mail" />} type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Full Name"
        >
          {getFieldDecorator('displayName', {
            rules: [{ required: true }],
          })(
            <Input prefix={<Icon type="user" />} placeholder="Your full name" />,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update Your Profile
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const mapPropsToFields = ({ user }) => {
  const { displayName = '' } = user

  return {
    displayName: {
      value: displayName,
    },
  }
}

export default Form.create({
  mapPropsToFields,
})(EditUserForm)

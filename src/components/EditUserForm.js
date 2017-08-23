import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'
import { Link } from 'react-router-dom'
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
    const { githubId } = this.props.user

    return (
      <Form onSubmit={this.handleSubmit}>
        {githubId && <Form.Item
          {...formItemLayout}
          label="From Github"
        >
          {githubId &&
            <p style={{ color: '#999' }}>
              Your account information is from github which is uneditable.
            </p>
          }
        </Form.Item>}
        <Form.Item
          {...formItemLayout}
          label="Username"
        >
          {getFieldDecorator('username', {
            rules: [{ required: true }],
          })(
            <Input disabled={githubId} prefix={<Icon type="user" />} placeholder="Pickup a username" />,
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Email"
        >
          {getFieldDecorator('email', {
            rules: [{ required: true }],
          })(
            <Input prefix={<Icon type="mail" />} type="email" placeholder="Email" />,
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Full Name"
        >
          {getFieldDecorator('displayName', {
            rules: [{ required: true }],
          })(
            <Input disabled={githubId} prefix={<Icon type="user" />} placeholder="Your full name" />,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update Your Profile
          </Button>
          <Link to="/">
            <Button size="large">Cancel</Button>
          </Link>
        </Form.Item>
      </Form>
    )
  }
}

const mapPropsToFields = ({ user }) => {
  const { username = '', email = '', displayName = '' } = user

  return {
    username: {
      value: username,
    },
    email: {
      value: email,
    },
    displayName: {
      value: displayName,
    },
  }
}

export default Form.create({
  mapPropsToFields,
})(EditUserForm)

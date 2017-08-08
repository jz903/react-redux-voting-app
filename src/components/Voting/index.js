import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

import './index.css'

let uuid = 0

class Voting extends PureComponent {
  static propTypes = {
    voting: object.isRequired,
    form: object.isRequired,
    addVoting: func,
    updateVoting: func,
  }

  static defaultProps = {
    addVoting: () => {},
    updateVoting: () => {},
  }

  remove = id => {
    const { form } = this.props
    const options = form.getFieldValue('options')
    // We need at least one options
    if (options.length === 1) return

    form.setFieldsValue({
      options: options.filter(option => option !== id),
    })
  }

  add = () => {
    uuid += 1
    const { form } = this.props
    const options = form.getFieldValue('options')
    const nextOptions = options.concat(uuid)
    form.setFieldsValue({
      options: nextOptions,
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { voting, form, addVoting, updateVoting } = this.props

    form.validateFields((err, values) => {
      if (!err) {
        const { options, title, multiple } = values
        const filteredValues = {
          title,
          multiple,
          options: options.map(id => values[`options-${id}`]),
        }

        if (Object.keys(voting).length > 0) {
          updateVoting(voting.id, filteredValues)
        } else {
          addVoting(filteredValues)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 12,
          offset: 6,
        },
      },
    }

    getFieldDecorator('options', { initialValue: [] })

    const options = getFieldValue('options')
    const votingOptions = options.map((id, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : tailFormItemLayout)}
        label={index === 0 ? 'Options' : ''}
        required={false}
        key={id}
      >
        {getFieldDecorator(`options-${id}`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input option's text or delete this field.",
          }],
        })(
          <Input placeholder="option text" style={{ width: '60%', marginRight: 8 }} />,
        )}
        {options.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={options.length === 1}
            onClick={() => this.remove(id)}
          />
        ) : null}
      </Form.Item>
    ))

    return (
      <div className="voting container">
        <h2>Create a new voting</h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item
            {...formItemLayout}
            label="Title"
          >
            {getFieldDecorator('title', {
              rules: [{ required: true }],
            })(
              <Input />,
            )}
          </Form.Item>
          {votingOptions}
          <Form.Item {...tailFormItemLayout}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus" /> Add Option
            </Button>
          </Form.Item>
          <Form.Item
            {...tailFormItemLayout}
          >
            {getFieldDecorator('multiple', {
              valuePropName: 'checked',
            })(
              <Checkbox>Multiple Choice?</Checkbox>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Save</Button>
            <Link to="/">
              <Button size="large">Cancel</Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Voting)

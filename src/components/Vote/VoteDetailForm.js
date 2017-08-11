import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

let uuid = 0

class VoteDetailForm extends PureComponent {
  static propTypes = {
    vote: object.isRequired,
    form: object.isRequired,
    addVote: func.isRequired,
    updateVote: func.isRequired,
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

    const { vote, form, addVote, updateVote } = this.props

    form.validateFields((err, values) => {
      if (!err) {
        const { options, title, multiple } = values
        const filteredValues = {
          title,
          multiple,
          options: options.map(id => values[`options-${id}`]),
        }

        if (vote.id) {
          updateVote(vote.id, filteredValues)
        } else {
          addVote(filteredValues)
        }
      }
    })
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form
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

    getFieldDecorator('options')
    const options = getFieldValue('options')
    const voteOptions = options.map((id, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : tailFormItemLayout)}
        label={index === 0 ? 'Options' : ''}
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
          <Input placeholder="option text" style={{ width: '90%', marginRight: 8 }} />,
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
      <Form onSubmit={this.handleSubmit}>
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
        {voteOptions}
        <Form.Item {...tailFormItemLayout}>
          <Button type="dashed" onClick={this.add}>
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
    )
  }
}

const mapPropsToFields = ({ vote }) => {
  const { title = '', options = [], multiple = false } = vote
  const optionsFields = {}

  if (options && options.length) {
    options.forEach(option => {
      optionsFields[`options-${option.id}`] = {
        value: option.text || '',
      }
    })
  }

  return {
    title: {
      value: title,
    },
    options: {
      value: options.map(o => o.id),
    },
    multiple: {
      value: multiple,
    },
    ...optionsFields,
  }
}

export default Form.create({
  mapPropsToFields,
})(VoteDetailForm)

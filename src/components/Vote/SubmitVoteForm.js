import React, { PureComponent } from 'react'
import { string, bool, object, array, func } from 'prop-types'
import { Form, Button, Checkbox, Radio } from 'antd'

import './SubmitVoteForm.css'

class SubmitVoteForm extends PureComponent {
  static propTypes = {
    id: string.isRequired,
    multiple: bool.isRequired,
    options: array.isRequired,
    form: object.isRequired,
    submitVote: func.isRequired,
  }

  static defaultProps ={
    multiple: false,
    options: [],
  }

  handleSubmit = e => {
    e.preventDefault()

    const { id, form, submitVote } = this.props

    form.validateFields((err, values) => {
      if (!err) {
        submitVote(id, values)
      }
    })
  }

  render() {
    const { multiple, options, form } = this.props
    const { getFieldDecorator } = form
    const formOptions = options.map(option => ({
      label: option.text,
      value: option.id,
    }))
    const voteOptions = (
      <Form.Item>
        {
          getFieldDecorator('options', {
            rules: [{ required: true, message: 'Please choose one option at least' }],
          })(
            multiple ?
              <Checkbox.Group options={formOptions} /> :
              <Radio.Group options={formOptions} />,
          )
        }
      </Form.Item>
    )

    return (
      <Form onSubmit={this.handleSubmit} className="vote-form">
        {voteOptions}
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(SubmitVoteForm)

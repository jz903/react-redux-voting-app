import React, { PureComponent } from 'react'
import { bool, object, array, func } from 'prop-types'
import { Form, Button, Checkbox, Radio } from 'antd'

import './SubmitVoteForm.css'

class SubmitVoteForm extends PureComponent {
  static propTypes = {
    multiple: bool,
    options: array,
    form: object.isRequired,
    submitVote: func.isRequired,
  }

  static defaultProps ={
    multiple: false,
    options: [],
  }

  handleSubmit = e => {
    e.preventDefault()

    const { form } = this.props

    form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
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
    const multipleOptions = getFieldDecorator('options')(
      <Form.Item>
        {
          multiple ?
            <Checkbox.Group options={formOptions} /> :
            <Radio.Group options={formOptions} />
        }
      </Form.Item>,
    )

    return (
      <Form onSubmit={this.handleSubmit} className="vote-form">
        {multipleOptions}
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(SubmitVoteForm)

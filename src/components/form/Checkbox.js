import React from 'react'
import { object, string } from 'prop-types'
import Checkbox from 'material-ui/Checkbox'

const RenderCheckbox = ({
  input,
  label,
}) => (
  <Checkbox
    label={label}
    checked={input.value}
    onCheck={input.onChange}
  />
)

RenderCheckbox.propTypes = {
  input: object,
  label: string,
}

RenderCheckbox.defaultProps = {
  input: {},
  label: '',
}

export default RenderCheckbox

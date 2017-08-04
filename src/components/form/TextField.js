import React from 'react'
import { string, object } from 'prop-types'
import TextField from 'material-ui/TextField'

const RenderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

RenderTextField.propTypes = {
  input: object,
  meta: object,
  label: string,
  error: string,
}

RenderTextField.defaultProps = {
  input: {},
  meta: {},
  label: '',
  error: '',
}

export default RenderTextField

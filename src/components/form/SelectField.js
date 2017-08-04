import React from 'react'
import { object, string, node } from 'prop-types'
import SelectField from 'material-ui/SelectField'

const RenderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    {...custom}
  >
    {children}
  </SelectField>
)

RenderSelectField.propTypes = {
  input: object,
  meta: object,
  children: node,
  label: string,
}

RenderSelectField.defaultProps = {
  input: {},
  meta: {},
  label: '',
  children: null,
}

export default RenderSelectField

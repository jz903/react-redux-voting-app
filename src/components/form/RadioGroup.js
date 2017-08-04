import React from 'react'
import { object } from 'prop-types'
import { RadioButtonGroup } from 'material-ui/RadioButton'

const renderRadioGroup = ({
  input,
  ...rest
}) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
)

renderRadioGroup.propTypes = {
  input: object,
}

renderRadioGroup.defaultProps = {
  input: {},
}

export default renderRadioGroup

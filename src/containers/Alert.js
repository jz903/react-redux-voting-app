import React from 'react'
import { bool, string, func } from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import * as actions from '../actions/system'

const Alert = ({
  alertShown,
  errorMessage,
  hideAlert,
}) => {
  const cancelActions = [
    <FlatButton
      primary
      label="Discard"
      onTouchTap={hideAlert}
    />,
  ]

  return (
    <Dialog
      bodyStyle={{
        color: '#F44336',
      }}
      actions={cancelActions}
      modal={false}
      open={alertShown}
      onRequestClose={hideAlert}
    >
      {errorMessage}
    </Dialog>
  )
}

Alert.propTypes = {
  alertShown: bool,
  errorMessage: string,
  hideAlert: func,
}

Alert.defaultProps = {
  alertShown: false,
  errorMessage: '',
  hideAlert: () => {},
}

const mapStateToProps = state => ({
  alertShown: state.system.alertShown,
  errorMessage: state.system.errorMessage,
})

const mapDispatchToProps = dispatch => ({
  hideAlert: () => {
    dispatch(actions.hideAlert())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Alert)

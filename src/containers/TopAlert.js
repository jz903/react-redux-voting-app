import React from 'react'
import { oneOfType, bool, object, func } from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from 'antd'

import * as actions from '../actions/system'

const TopAlert = ({
  alert,
  hideAlert,
}) => alert && (
  <Alert
    className="top-alert"
    type={alert.type}
    message={alert.message}
    onClose={hideAlert}
    banner
    closable
  />
)

TopAlert.propTypes = {
  alert: oneOfType([bool, object]),
  hideAlert: func,
}

TopAlert.defaultProps = {
  alert: false,
  hideAlert: () => {},
}

const mapStateToProps = state => ({
  alert: state.system.alert,
})

const mapDispatchToProps = dispatch => ({
  hideAlert: () => {
    dispatch(actions.hideAlert())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(TopAlert)

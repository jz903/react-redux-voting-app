import React from 'react'
import { bool, string, func } from 'prop-types'
import { connect } from 'react-redux'
import { Modal } from 'antd'

import * as actions from '../actions/system'

const Alert = ({
  alertShown,
  errorMessage,
  hideAlert,
}) => (
  <Modal
    title="Basic Modal"
    visible={alertShown}
    onOk={hideAlert}
    onCancel={hideAlert}
  >
    <p>{errorMessage}</p>
  </Modal>
)

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

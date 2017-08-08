import React from 'react'
import { bool } from 'prop-types'
import { connect } from 'react-redux'
import { Spin } from 'antd'

import './Loading.css'

const Loading = ({
  isLoading,
}) => isLoading && (
  <div className="loading">
    <Spin tip="Loading..." />
  </div>
)

Loading.propTypes = {
  isLoading: bool,
}

Loading.defaultProps = {
  isLoading: false,
}

const mapStateToProps = state => ({
  isLoading: state.system.isLoading,
})

export default connect(mapStateToProps)(Loading)

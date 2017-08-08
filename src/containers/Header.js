import React from 'react'
import { object } from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentUser } from '../selectors'
import Header from '../components/Header'

const HeaderContainer = ({
  user,
}) => {
  const isLogged = user && user.id

  return isLogged ? <Header user={user} /> : null
}

HeaderContainer.propTypes = {
  user: object,
}

HeaderContainer.defaultProps = {
  user: {},
}

const mapStateToProps = state => ({
  user: getCurrentUser(state),
})

export default connect(mapStateToProps)(HeaderContainer)

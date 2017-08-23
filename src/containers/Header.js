import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { getCurrentUser } from '../selectors'
import Header from '../components/Header'
import { updateFilter } from '../actions/filter'

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  filter: state.filter,
  router: state.router,
})

const mapDispatchToProps = dispatch => ({
  updateFilter: filter => {
    dispatch(updateFilter(filter))
  },
  push: url => {
    dispatch(push(url))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

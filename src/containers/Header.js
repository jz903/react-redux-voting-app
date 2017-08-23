import { connect } from 'react-redux'

import { getCurrentUser } from '../selectors'
import Header from '../components/Header'
import { updateFilter } from '../actions/filter'

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  filter: state.filter,
})

const mapDispatchToProps = dispatch => ({
  updateFilter: filter => {
    dispatch(updateFilter(filter))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

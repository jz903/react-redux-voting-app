import { connect } from 'react-redux'
import Home from '../components/Home'
import { getCurrentUser } from '../selectors'
import { fetchAllVotes, deleteVote } from '../actions/vote'
import { updateFilter } from '../actions/filter'

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  votes: state.entities.votes,
  filter: state.filter,
})

const mapDispatchToProps = dispatch => ({
  fetchAllVotes: () => {
    dispatch(fetchAllVotes())
  },
  deleteVote: id => {
    dispatch(deleteVote(id))
  },
  updateFilter: filter => {
    dispatch(updateFilter(filter))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

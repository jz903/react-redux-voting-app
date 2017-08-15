import { connect } from 'react-redux'
import Home from '../components/Home'
import { getCurrentUser } from '../selectors'
import { fetchAllVotes, deleteVote } from '../actions/vote'

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  votes: state.entities.votes,
})

const mapDispatchToProps = dispatch => ({
  fetchAllVotes: () => {
    dispatch(fetchAllVotes())
  },
  deleteVote: id => {
    dispatch(deleteVote(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

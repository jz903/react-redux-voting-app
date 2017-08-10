import { connect } from 'react-redux'
import Home from '../components/Home'
import { getCurrentUser } from '../selectors'
import { fetchAllVotes } from '../actions/vote'

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  votes: state.entities.votes,
})

const mapDispatchToProps = dispatch => ({
  fetchAllVotes: () => {
    dispatch(fetchAllVotes())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

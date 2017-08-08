import { connect } from 'react-redux'
import Voting from '../components/Voting'
import { addVoting, updateVoting } from '../actions/voting'
import { getCurrentVoting } from '../selectors'

const mapStateToProps = (state, ownProps) => ({
  voting: getCurrentVoting(state, ownProps),
})

const mapDispatchToProps = dispatch => ({
  addVoting: data => {
    dispatch(addVoting(data))
  },
  updateVoting: (id, data) => {
    dispatch(updateVoting(id, data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Voting)

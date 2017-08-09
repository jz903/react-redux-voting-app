import { connect } from 'react-redux'
import Vote from '../components/Vote'
import { addVote, updateVote } from '../actions/vote'
import { getCurrentVote } from '../selectors'

const mapStateToProps = (state, ownProps) => ({
  vote: getCurrentVote(state, ownProps),
})

const mapDispatchToProps = dispatch => ({
  addVote: data => {
    dispatch(addVote(data))
  },
  updateVote: (id, data) => {
    dispatch(updateVote(id, data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Vote)

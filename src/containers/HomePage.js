import { connect } from 'react-redux'
import Home from '../components/Home'
import { getCurrentUser } from '../selectors'

const mapStateToProps = state => ({
  user: getCurrentUser(state),
})

export default connect(mapStateToProps, {})(Home)

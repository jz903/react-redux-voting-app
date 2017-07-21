import { connect } from 'react-redux'
import SignIn from '../components/SignIn'

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, {})(SignIn)

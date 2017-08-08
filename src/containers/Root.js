import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import { fetchUser } from '../actions/user'
import { hideAlert } from '../actions/system'
import Header from './Header'
import TopAlert from './TopAlert'
import Loading from './Loading'
import Home from './HomePage'
import SignIn from './SignInPage'
import SignUp from './SignUpPage'
import Logout from './LogoutPage'

class Root extends PureComponent {
  static propTypes = {
    store: object.isRequired,
    history: object.isRequired,
  }

  componentDidMount() {
    const { store } = this.props

    store.dispatch(fetchUser())
  }

  render() {
    const { store, history } = this.props

    // When the route changes, clear Alerts.
    history.listen(() => {
      // hide **Alerts** from API
      store.dispatch(hideAlert())
    })

    return (
      <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={SignIn} />
            <Route path="/join" component={SignUp} />
            <Route path="/logout" component={Logout} />
            <TopAlert />
            <Loading />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default Root

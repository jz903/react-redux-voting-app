import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { Layout } from 'antd'

import { fetchUser } from '../actions/user'
import Header from './Header'
import Loading from './Loading'
import Home from './HomePage'
import SignIn from './SignInPage'
import SignUp from './SignUpPage'
import Logout from './LogoutPage'
import Vote from './VotePage'

const { Content, Footer } = Layout

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

    return (
      <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
          <Layout className="layout">
            <Header />
            <Content>
              <Route exact path="/" component={Home} />
              <Route path="/vote/:id" component={Vote} />
              <Route path="/login" component={SignIn} />
              <Route path="/join" component={SignUp} />
              <Route path="/logout" component={Logout} />
            </Content>
            <Footer>
              VOTING APP ©2017 Chris Zhou
            </Footer>
            <Loading />
          </Layout>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default Root

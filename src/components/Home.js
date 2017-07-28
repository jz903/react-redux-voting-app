import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import './Home.css'

class Home extends PureComponent {
  static propTypes = {
    user: object, // eslint-disable-line
  }

  render() {
    const { user } = this.props
    const name = (user && user.displayName) || ''
    return (
      <div className="App">
        <div className="App-header">
          <img src="/assets/images/logo.svg" className="App-logo" alt="logo" />
          <h2>
            Welcome {name} to React
          </h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default Home

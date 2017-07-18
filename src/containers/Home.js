import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import { connect } from 'react-redux'
import logo from '../logo.svg'
import './Home.css'

class Home extends PureComponent {
  static propTypes = {
    user: object, // eslint-disable-line
  }

  render() {
    const { user } = this.props
    const name = user.name || ''
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome { name } to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, {})(Home)

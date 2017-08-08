import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import './Home.css'

class Home extends PureComponent {
  static propTypes = {
    user: object,
  }

  static defaultProps = {
    user: {},
  }

  render() {
    const { user } = this.props
    const name = (user && user.displayName) || ''
    return (
      <div className="App">
        <div className="App-header">
          <img src="/assets/images/logo.svg" className="App-logo" alt="logo" />
          <h2>
            Welcome {name} to FCC VOTING APP
          </h2>
        </div>
        <p className="App-intro">
          There is no votings yet.<br />
          <Link to="/voting/new">
            <Button type="primary" icon="file-add" className="add-voting">
              Add a new voting
            </Button>
          </Link>
        </p>
      </div>
    )
  }
}

export default Home

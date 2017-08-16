import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'antd'

import VoteCard from './Vote/VoteCard'

import './Home.css'

class Home extends PureComponent {
  static propTypes = {
    user: object.isRequired,
    votes: object.isRequired,
    fetchAllVotes: func.isRequired,
    deleteVote: func.isRequired,
  }

  componentDidMount() {
    const { fetchAllVotes } = this.props

    fetchAllVotes()
  }

  render() {
    const { user, votes, deleteVote } = this.props
    const name = (user && user.displayName) || ''
    const isEmpty = Object.keys(votes).length === 0

    return (
      <div className="App container">
        <div className="App-header">
          <img src="/assets/images/logo.svg" className="App-logo" alt="logo" />
          <h2>
            Welcome {name} to FCC VOTING APP
          </h2>
        </div>
        <p className="App-intro">
          {isEmpty && <span>There is no votes yet.<br /></span>}
          {
            user.id &&
            <Link to="/vote/new">
              <Button type="primary" icon="file-add" className="add-vote">
                Add a new vote
              </Button>
            </Link>
          }
        </p>
        <div className="App-votes">
          <Row type="flex" gutter={16}>
            {Object.keys(votes).map(key => (
              <Col span={8} key={key}>
                <VoteCard vote={votes[key]} deleteVote={deleteVote}>Card content</VoteCard>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    )
  }
}

export default Home

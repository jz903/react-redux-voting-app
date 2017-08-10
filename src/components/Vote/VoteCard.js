import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'antd'

import './VoteCard.css'

class VoteCard extends PureComponent {
  static propTypes = {
    vote: object.isRequired,
  }

  render() {
    const { vote } = this.props
    return (
      <Link to={`/vote/${vote.id}`}>
        <Card
          title={vote.title}
          className="vote-card"
        >
          <ul>
            {vote.options.map(option => (
              <li key={option.id}>{option.text}</li>
            ))}
          </ul>
          <div className="vote-card__footer">
            <span>by {vote.owner.name}</span> at {new Date(vote.date).toLocaleDateString()}
          </div>
        </Card>
      </Link>
    )
  }
}

export default VoteCard

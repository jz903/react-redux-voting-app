import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'
import { Row, Col, Card } from 'antd'
import VoteDetailForm from './VoteDetailForm'

import './VoteDetail.css'

class VoteDetail extends PureComponent {
  static propTypes = {
    match: object.isRequired,
    vote: object.isRequired,
    addVote: func.isRequired,
    updateVote: func.isRequired,
    fetchVoteDetail: func.isRequired,
  }

  componentDidMount() {
    const { match, fetchVoteDetail } = this.props
    const { id } = match.params

    if (id !== 'new') {
      fetchVoteDetail(match.params.id)
    }
  }

  render() {
    const { vote, match, addVote, updateVote } = this.props
    const isNew = match.params.id === 'new'
    const isShowVoteDetail = isNew || vote.isOwner

    return (
      <div className="vote container">
        <Row gutter={16}>
          {isShowVoteDetail && <Col span={14}>
            <Card
              title={`${isNew ? 'Create a new' : 'Edit the'} vote`}
              className="box-card"
            >
              <VoteDetailForm
                vote={vote}
                addVote={addVote}
                updateVote={updateVote}
              />
            </Card>
          </Col>}
          <Col span={10}>
            <Card
              title="Vote statistics"
              className="box-card"
            >
              Visual Statistics
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default VoteDetail

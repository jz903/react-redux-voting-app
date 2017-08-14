import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'
import { Row, Col, Card } from 'antd'

import EditVoteForm from './EditVoteForm'
import VoteStat from './VoteStat'
import SubmitVoteForm from './SubmitVoteForm'

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
              <EditVoteForm
                vote={vote}
                addVote={addVote}
                updateVote={updateVote}
              />
            </Card>
          </Col>}
          {
            !isNew &&
            <Col span={10}>
              <Card
                title="Vote statistics"
                className="box-card"
              >
                <VoteStat options={vote.options} />
                <h3 className="vote-form__title">{vote.title}</h3>
                <SubmitVoteForm options={vote.options} />
              </Card>
            </Col>
          }
        </Row>
      </div>
    )
  }
}

export default VoteDetail

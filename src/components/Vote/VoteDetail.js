import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'
import { Row, Col, Card } from 'antd'

import EditVoteForm from './EditVoteForm'
import VoteStat from './VoteStat'
import SubmitVoteForm from './SubmitVoteForm'
import VoteCorner from './VoteCorner'

import './VoteDetail.css'

class VoteDetail extends PureComponent {
  static propTypes = {
    match: object.isRequired,
    vote: object.isRequired,
    addVote: func.isRequired,
    updateVote: func.isRequired,
    deleteVote: func.isRequired,
    fetchVoteDetail: func.isRequired,
    submitVote: func.isRequired,
  }

  componentDidMount() {
    const { match, fetchVoteDetail } = this.props
    const { id } = match.params

    if (id !== 'new') {
      fetchVoteDetail(match.params.id)
    }
  }

  handleDelete = () => {
    const { vote, deleteVote } = this.props

    if (vote.id) {
      deleteVote(vote.id)
    }
  }

  render() {
    const { match, vote, addVote, updateVote, submitVote } = this.props
    const isVoteValid = !!vote.id
    const isNewVote = match.params.id === 'new'
    const isShowVoteDetail = (isVoteValid && vote.isOwner) || isNewVote

    return (
      <div className="vote page container">
        <Row gutter={16}>
          {isShowVoteDetail && <Col span={isVoteValid ? 14 : 24}>
            <Card
              title={`${isVoteValid ? 'Edit the' : 'Create a new'} vote`}
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
            isVoteValid &&
            <Col span={isShowVoteDetail ? 10 : 24}>
              <Card
                title="Vote Detail"
                className="box-card vote-card"
                extra={<VoteCorner showDelete={vote.isOwner} onDelete={this.handleDelete} />}
              >
                <VoteStat options={vote.options} />
                <h3 className="vote-form__title">{vote.title}</h3>
                <SubmitVoteForm
                  id={vote.id}
                  options={vote.options}
                  multiple={vote.multiple}
                  submitVote={submitVote}
                />
              </Card>
            </Col>
          }
        </Row>
      </div>
    )
  }
}

export default VoteDetail

import { push } from 'react-router-redux'
import { CALL_API } from '../middleware/api'
import { Schemas } from '../constants/entities'
import * as actionTypes from '../constants/actionTypes'

export const fetchAllVotes = () => ({
  [CALL_API]: {
    type: actionTypes.FETCH_ALL_VOTES,
    endpoint: '/vote',
    schema: Schemas.VOTE_ARRAY,
  },
})

export const fetchVoteDetail = id => ({
  [CALL_API]: {
    type: actionTypes.FETCH_VOTE_DETAIL,
    endpoint: `/vote/${id}`,
    schema: Schemas.VOTE,
  },
})

export const addVoteRequest = payload => ({
  [CALL_API]: {
    type: actionTypes.ADD_VOTE,
    endpoint: '/vote/new',
    method: 'POST',
    payload,
    schema: Schemas.VOTE,
  },
})

export const addVote = payload => dispatch => {
  dispatch(addVoteRequest(payload))
    .then(() => dispatch(push('/')))
}

export const updateVoteRequest = (id, payload) => ({
  [CALL_API]: {
    type: actionTypes.UPDATE_VOTE,
    endpoint: `/vote/${id}`,
    method: 'PUT',
    payload,
    schema: Schemas.VOTE,
  },
})

export const updateVote = (id, payload) => dispatch => {
  dispatch(updateVoteRequest(id, payload))
    .then(data => {
      const result = data && data.response.result

      if (result) {
        dispatch(push('/'))
      }
    })
}

export const submitVote = (id, payload) => ({
  [CALL_API]: {
    type: actionTypes.SUBMIT_VOTE,
    endpoint: `/vote/${id}/options`,
    method: 'PUT',
    payload,
    schema: Schemas.VOTE,
  },
})

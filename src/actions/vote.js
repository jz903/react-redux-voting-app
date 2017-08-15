import { push } from 'react-router-redux'
import { message } from 'antd'

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
    .then(({ response }) => {
      if (response) {
        dispatch(push('/'))
        message.success('Vote has been created')
      }
    })
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
    .then(({ response }) => {
      if (response) {
        dispatch(push('/'))
        message.success('Vote has been updated')
      }
    })
}

export const deleteVoteRequest = id => ({
  [CALL_API]: {
    type: actionTypes.DELETE_VOTE,
    endpoint: `/vote/${id}`,
    method: 'DELETE',
  },
})

export const deleteVote = id => (dispatch, getState) => {
  dispatch(deleteVoteRequest(id))
    .then(({ response }) => {
      if (response) {
        const { router } = getState()
        if (router.location.pathname === '/') {
          // fetch all votes again in homepage
          dispatch(fetchAllVotes())
        } else {
          // redirect to homepage
          dispatch(push('/'))
        }
      }
    })
}

export const submitVoteRequest = (id, payload) => ({
  [CALL_API]: {
    type: actionTypes.SUBMIT_VOTE,
    endpoint: `/vote/${id}/options`,
    method: 'PUT',
    payload,
    schema: Schemas.VOTE,
  },
})

export const submitVote = (id, payload) => dispatch => {
  dispatch(submitVoteRequest(id, payload))
    .then(({ response }) => {
      if (response) {
        message.success('Vote statistics has been updated')
      }
    })
}

import { CALL_API } from '../middleware/api'
import { Schemas } from '../constants/entities'
import * as actionTypes from '../constants/actionTypes'

export const addVote = payload => ({
  [CALL_API]: {
    type: actionTypes.ADD_VOTE,
    endpoint: '/vote/new',
    method: 'POST',
    payload,
    schema: Schemas.VOTE,
  },
})

export const updateVote = (id, payload) => ({
  [CALL_API]: {
    type: actionTypes.UPDATE_VOTE,
    endpoint: `/vote/${id}`,
    method: 'PUT',
    payload,
    schema: Schemas.VOTE,
  },
})

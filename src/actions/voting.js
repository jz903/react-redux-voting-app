import { CALL_API } from '../middleware/api'
import { Schemas } from '../constants/entities'
import * as actionTypes from '../constants/actionTypes'

export const addVoting = payload => ({
  [CALL_API]: {
    type: actionTypes.ADD_VOTING,
    endpoint: '/voting/new',
    method: 'POST',
    payload,
    schema: Schemas.VOTING,
  },
})

export const updateVoting = (id, payload) => ({
  [CALL_API]: {
    type: actionTypes.UPDATE_VOTING,
    endpoint: `/voting/${id}`,
    method: 'PUT',
    payload,
    schema: Schemas.VOTING,
  },
})

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import * as ActionTypes from '../constants/actionTypes'

const user = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CURRENT_USER:
      return {
        id: action.id,
      }
    default:
      return state
  }
}

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {}, votes: {} }, action) => {
  if (action.response && action.response.entities) {
    return {
      ...state,
      ...action.response.entities,
    }
  }

  return state
}

const system = (
  state = {
    alert: false,
    isLoading: false,
  },
  action,
) => {
  const { type, error, success, isLoading } = action
  const newState = {}

  switch (type) {
    case ActionTypes.SHOW_ALERT:
      return {
        ...state,
        alert: {
          ...action.alert,
        },
      }
    case ActionTypes.HIDE_ALERT:
      return {
        ...state,
        alert: false,
      }
    default:
      if (error) {
        newState.alert = {
          type: 'error',
          message: error,
        }
      }

      if (success) {
        newState.alert = {
          type: 'success',
          message: success,
        }
      }

      if (isLoading !== undefined) {
        newState.isLoading = isLoading
      }

      return {
        ...state,
        ...newState,
      }
  }
}

const rootReducer = combineReducers({
  user,
  entities,
  system,
  router: routerReducer,
})

export default rootReducer

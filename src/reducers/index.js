import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

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
const entities = (state = { users: {} }, action) => {
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
    errorMessage: null,
    alertShown: false,
    isLoading: false,
  },
  action,
) => {
  const { type, error, isLoading } = action
  const newState = {}

  switch (type) {
    case ActionTypes.RESET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: null,
      }
    case ActionTypes.SHOW_ALERT:
      return {
        ...state,
        alertShown: true,
      }
    case ActionTypes.HIDE_ALERT:
      return {
        ...state,
        alertShown: false,
      }
    default:
      if (error) {
        newState.errorMessage = error
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
  form: formReducer,
})

export default rootReducer

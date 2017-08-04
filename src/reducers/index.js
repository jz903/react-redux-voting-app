import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import * as ActionTypes from '../actions'

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

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }

  return state
}

// Updates alert to notify about the failed fetches.
const alertShown = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_ALERT:
      return true
    case ActionTypes.HIDE_ALERT:
      return false
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user,
  entities,
  errorMessage,
  alertShown,
  router: routerReducer,
  form: formReducer,
})

export default rootReducer

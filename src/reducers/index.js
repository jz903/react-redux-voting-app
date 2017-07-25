import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import * as ActionTypes from '../actions'

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

const rootReducer = combineReducers({
  entities,
  errorMessage,
  router: routerReducer,
  form: formReducer,
})

export default rootReducer

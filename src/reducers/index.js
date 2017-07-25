import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import * as ActionTypes from '../actions'

const user = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        ...action.response,
      }
    default:
      return state
  }
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
  user,
  errorMessage,
  router: routerReducer,
  form: formReducer,
})

export default rootReducer

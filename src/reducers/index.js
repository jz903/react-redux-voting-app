import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { message } from 'antd'

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
    isLoading: false,
  },
  action,
) => {
  const { suppressError, error, success, isLoading } = action

  if (error && !suppressError) {
    message.error(error)
  }

  if (success) {
    message.success(success)
  }

  return {
    ...state,
    isLoading,
  }
}

const filter = (state = {
  user: '',
  keyword: '',
}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_FILTER:
      return {
        ...state,
        ...action.filter,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user,
  filter,
  entities,
  system,
  router: routerReducer,
})

export default rootReducer

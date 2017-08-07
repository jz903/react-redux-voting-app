import { replace } from 'react-router-redux'
import { CALL_API, Schemas } from '../middleware/api'
import { BLACK_LIST_TO_FETCH_USER } from '../constants'
import * as actionTypes from '../constants/actionTypes'

export const updateCurrentUserId = id => ({
  type: actionTypes.UPDATE_CURRENT_USER,
  id,
})

// fetch user request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchUserRequest = () => ({
  [CALL_API]: {
    types: [
      actionTypes.FEATCH_USER_REQUEST,
      actionTypes.FEATCH_USER_SUCCESS,
      actionTypes.FEATCH_USER_FAILURE,
    ],
    endpoint: '/user',
    schema: Schemas.USER,
  },
})

export const fetchUser = () => (dispatch, getState) => {
  const { pathname } = getState().router.location

  if (BLACK_LIST_TO_FETCH_USER.indexOf(pathname) === -1) {
    dispatch(fetchUserRequest())
      .then(data => {
        const result = data && data.response.result

        if (result) {
          dispatch(updateCurrentUserId(result))
        }
      })
  }
}

// sign in request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const signInRequest = payload => ({
  [CALL_API]: {
    types: [
      actionTypes.SIGNIN_REQUEST,
      actionTypes.SIGNIN_SUCCESS,
      actionTypes.SIGNIN_FAILURE,
    ],
    endpoint: '/login',
    method: 'POST',
    payload,
    schema: Schemas.USER,
  },
})

export const signIn = payload => dispatch => {
  dispatch(signInRequest(payload))
    .then(data => {
      const result = data && data.response.result

      if (result) {
        dispatch(updateCurrentUserId(result))
        dispatch(replace('/'))
      }
    })
}

// sign up request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const signUpRequest = payload => ({
  [CALL_API]: {
    types: [
      actionTypes.SIGNUP_REQUEST,
      actionTypes.SIGNUP_SUCCESS,
      actionTypes.SIGNUP_FAILURE,
    ],
    endpoint: '/register',
    method: 'POST',
    payload,
    schema: Schemas.USER,
  },
})

export const signUp = payload => dispatch => {
  dispatch(signUpRequest(payload))
    .then(data => {
      const result = data && data.response.result

      if (result) {
        dispatch(updateCurrentUserId(result))
        dispatch(replace('/'))
      }
    })
}

// logout request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const logoutRequest = () => ({
  [CALL_API]: {
    types: [actionTypes.LOGOUT_REQUEST, actionTypes.LOGOUT_SUCCESS, actionTypes.LOGOUT_FAILURE],
    endpoint: '/logout',
  },
})

export const logout = () => dispatch => {
  dispatch(logoutRequest())
    .then(data => {
      if (data && data.type === actionTypes.LOGOUT_SUCCESS) {
        dispatch(replace('/login'))
      }
    })
}

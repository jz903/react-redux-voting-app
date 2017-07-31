import { replace } from 'react-router-redux'
import { CALL_API, Schemas } from '../middleware/api'
import { BLACK_LIST_TO_FETCH_USER } from '../constants'

export const FEATCH_USER_REQUEST = 'FEATCH_USER_REQUEST'
export const FEATCH_USER_SUCCESS = 'FEATCH_USER_SUCCESS'
export const FEATCH_USER_FAILURE = 'FEATCH_USER_FAILURE'
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'

export const updateCurrentUserId = id => ({
  type: UPDATE_CURRENT_USER,
  id,
})

// fetch user request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchUserRequest = () => ({
  [CALL_API]: {
    types: [FEATCH_USER_REQUEST, FEATCH_USER_SUCCESS, FEATCH_USER_FAILURE],
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

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE'

// sign in request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const signInRequest = payload => ({
  [CALL_API]: {
    types: [SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE],
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

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

// sign up request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const signUpRequest = payload => ({
  [CALL_API]: {
    types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE],
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

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

// logout request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const logoutRequest = () => ({
  [CALL_API]: {
    types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
    endpoint: '/logout',
  },
})

export const logout = () => dispatch => {
  dispatch(logoutRequest())
    .then(data => {
      if (data && data.type === LOGOUT_SUCCESS) {
        dispatch(replace('/login'))
      }
    })
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
})

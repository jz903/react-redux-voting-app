import { CALL_API } from '../middleware/api'

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE'

// sign in request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const signIn = payload => ({
  [CALL_API]: {
    types: [SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE],
    endpoint: '/api/user',
    method: 'POST',
    payload,
  },
})

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
})

import { CALL_API, Schemas } from '../middleware/api'

const blackListToFetchUser = ['/login', '/signup']
export const FEATCH_USER_REQUEST = 'FEATCH_USER_REQUEST'
export const FEATCH_USER_SUCCESS = 'FEATCH_USER_SUCCESS'
export const FEATCH_USER_FAILURE = 'FEATCH_USER_FAILURE'
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'

export const updateCurrentUser = user => ({
  type: UPDATE_CURRENT_USER,
  user,
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

  if (blackListToFetchUser.indexOf(pathname) === -1) {
    dispatch(fetchUserRequest())
      .then(({ response: { result } }) => {
        dispatch(updateCurrentUser({
          id: result,
        }))
      })
  }
}

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE'

// sign in request
// Relies on the custom API middleware defined in ../middleware/api.js.
export const signIn = payload => ({
  [CALL_API]: {
    types: [SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE],
    endpoint: '/login',
    method: 'POST',
    payload,
    schema: Schemas.USER,
  },
})

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
})

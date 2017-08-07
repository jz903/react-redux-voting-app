import * as actionTypes from '../constants/actionTypes'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: actionTypes.RESET_ERROR_MESSAGE,
})

export const showAlert = () => ({
  type: actionTypes.SHOW_ALERT,
})

export const hideAlert = () => ({
  type: actionTypes.HIDE_ALERT,
})

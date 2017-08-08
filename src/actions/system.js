import * as actionTypes from '../constants/actionTypes'

export const showAlert = alert => ({
  type: actionTypes.SHOW_ALERT,
  alert,
})

export const hideAlert = () => ({
  type: actionTypes.HIDE_ALERT,
})

import * as actionTypes from '../constants/actionTypes'

export const updateFilter = filter => ({
  type: actionTypes.UPDATE_FILTER,
  filter,
})

export default {
  updateFilter,
}

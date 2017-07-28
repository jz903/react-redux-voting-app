import { createSelector } from 'reselect'

const currentUserSelector = state => state.user
const usersSelector = state => state.entities.users

export const getCurrentUser = createSelector(
  currentUserSelector,
  usersSelector,
  (currUser, users) => ({
    id: currUser.id,
    ...users[currUser.id],
  }),
)

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

const currVotingId = (state, ownProps) => ownProps.match.params.id
const votingsSelector = state => state.entities.votings

export const getCurrentVoting = createSelector(
  currVotingId,
  votingsSelector,
  (id, votings) => ({
    ...votings[id],
  }),
)

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

const currVoteId = (state, ownProps) => ownProps.match.params.id
const votesSelector = state => state.entities.votes

export const getCurrentVote = createSelector(
  currVoteId,
  votesSelector,
  (id, votes) => ({
    ...votes[id],
  }),
)

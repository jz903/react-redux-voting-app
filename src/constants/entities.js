import { schema } from 'normalizr'

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// GitHub's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

export const userSchema = new schema.Entity('users', {}, {
  idAttribute: user => user.id,
})

export const voteSchema = new schema.Entity('votes', {}, {
  idAttribute: vote => vote.id,
})

// Schemas for API responses.
export const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  VOTE: voteSchema,
  VOTE_ARRAY: [voteSchema],
}

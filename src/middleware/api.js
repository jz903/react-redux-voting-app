import { push } from 'react-router-redux'
import { normalize, schema } from 'normalizr'
import { camelizeKeys } from 'humps'

import { showAlert } from '../actions'

const defaultHTTPHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}
// Fetches an API response.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = ({ endpoint, method, payload }, schema) => {
  const url = `/api${endpoint}`
  const config = {
    headers: defaultHTTPHeaders,
    method: method || 'GET',
    body: JSON.stringify(payload),
    credentials: 'include', // send a request with credentials included, send cookies to Passport to confirm session
  }

  if (config.method === 'GET' || config.method === 'DELETE') {
    config.body = null
  }

  return fetch(url, config)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }

        const camelizedJson = camelizeKeys(json)

        return schema ? {
          ...normalize(camelizedJson, schema),
        } : camelizedJson
      }),
    )
}

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

const userSchema = new schema.Entity('users', {}, {
  idAttribute: user => user.id,
})

// Schemas for Github API responses.
export const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(actionWith({ type: requestType }))

  return callApi(callAPI, schema).then(
    response => next(actionWith({
      response,
      type: successType,
    })),
    error => {
      if (error.error === 'NotSignIn') {
        store.dispatch(push('/login'))
      } else {
        store.dispatch(showAlert())
      }
      next(actionWith({
        type: failureType,
        error: error.error || 'Something bad happened',
      }))
    },
  )
}

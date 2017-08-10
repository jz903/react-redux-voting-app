import mongoose from 'mongoose'
import { transformModal as transform } from '../utils'

const Schema = mongoose.Schema

// create user schema
const User = new Schema({
  displayName: String,
  username: String,
  githubId: String,
}, {
  toObject: {
    transform,
  },
  toJSON: {
    transform,
  },
})

export default mongoose.model('users', User)

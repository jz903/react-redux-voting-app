import mongoose from 'mongoose'
import { transformModal as transform } from '../utils'

const Schema = mongoose.Schema
const Account = new Schema({
  displayName: String,
  username: String,
  password: String,
  email: String,
  githubId: String,
}, {
  toObject: {
    transform,
  },
  toJSON: {
    transform,
  },
})

export default mongoose.model('accounts', Account)

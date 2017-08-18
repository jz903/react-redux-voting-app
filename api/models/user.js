import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

import { transformModal as transform } from '../utils'

const Schema = mongoose.Schema

// create user schema
const User = new Schema({
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

User.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
User.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('users', User)

const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create user schema
const User = new Schema({
  displayName: String,
  username: String,
  password: String,
  email: String,
  githubId: String,
})

module.exports = mongoose.model('users', User)

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Account = new Schema({
  displayName: String,
  username: String,
  password: String,
  email: String,
  githubId: String,
})

module.exports = mongoose.model('accounts', Account)

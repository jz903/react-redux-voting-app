import mongoose from 'mongoose'

const Schema = mongoose.Schema
const Account = new Schema({
  displayName: String,
  username: String,
  password: String,
  email: String,
  githubId: String,
})

export default mongoose.model('accounts', Account)

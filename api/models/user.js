import mongoose from 'mongoose'

const Schema = mongoose.Schema

// create user schema
const User = new Schema({
  displayName: String,
  username: String,
  githubId: String,
})

export default mongoose.model('users', User)

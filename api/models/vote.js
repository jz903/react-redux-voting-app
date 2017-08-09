import mongoose from 'mongoose'

const Schema = mongoose.Schema
const Vote = new Schema({
  title: String,
  options: Array,
  date: { type: Date, default: Date.now },
})

export default mongoose.model('votes', Vote)

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Vote = new Schema({
  title: String,
  options: Array,
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('votes', Vote)

import mongoose from 'mongoose'
import { transformModal as transform } from '../utils'

const Schema = mongoose.Schema

const Option = new Schema({
  text: String,
  number: {
    type: Number,
    default: 0,
  },
}, {
  toObject: {
    transform,
  },
  toJSON: {
    transform,
  },
})

const Vote = new Schema({
  title: String,
  multiple: {
    type: Boolean,
    default: false,
  },
  options: [Option],
  date: { type: Date, default: Date.now },
  owner: {
    id: String,
    name: String,
  },
}, {
  toObject: {
    transform,
  },
  toJSON: {
    transform,
  },
})

export default mongoose.model('votes', Vote)

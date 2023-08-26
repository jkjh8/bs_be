/** @format */

import mongoose from 'mongoose'
import { searchArrToStr, makeSearchField } from '@/api/logger/search'
// import mongoosePaginate from 'mongoose-paginate-v2'

const eventLogSchema = new mongoose.Schema(
  {
    source: String,
    level: Number,
    priority: String,
    user: String,
    zones: Array,
    message: String,
    search: String
  },
  {
    timestamps: true
  }
)

// eventLogSchema.plugin(mongoosePaginate)

makeSearchField(eventLogSchema, 'search', (docs) => {
  const arr = []
  const { user = '', source = '', zones = [], message = '' } = docs
  arr.push(user)
  arr.push(source)
  arr.push(zones.join(','))
  arr.push(message)
  return searchArrToStr(arr)
})

export default mongoose.model('EventLog', eventLogSchema)

/** @format */

const mongoose = require('mongoose')
const { searchArrToStr, makeSearchField } = require('../../api/logger/search')
const mongoosePaginate = require('mongoose-paginate-v2')

const eventLogSchema = new mongoose.Schema(
  {
    source: String,
    level: Number,
    priority: Number,
    user: String,
    zones: Array,
    message: String,
    search: String
  },
  {
    timestamps: true
  }
)

eventLogSchema.plugin(mongoosePaginate)

makeSearchField(eventLogSchema, 'search', (docs) => {
  const arr = []
  const { id = '', source = '', zones = [], message = '' } = docs
  arr.push(id)
  arr.push(source)
  arr.push(zones.join(','))
  arr.push(message)
  return searchArrToStr(arr)
})

module.exports = mongoose.model('EventLog', eventLogSchema)

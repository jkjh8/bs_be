/** @format */

import mongoose from 'mongoose'
import { searchArrToStr, makeSearchField } from '@/api/logger/search'

const logsSchema = new mongoose.Schema(
  {
    level: String,
    message: String,
    search: String
  },
  { timestamps: true }
)

makeSearchField(logsSchema, 'search', (docs) => {
  const arr = []
  const { level, message } = docs
  arr.push(level)
  arr.push(message)
  return searchArrToStr(arr)
})

export default mongoose.model('Logs', logsSchema)

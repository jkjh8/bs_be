/** @format */

import mongoose from 'mongoose'
import { logInfo, logError } from '@/api/logger'

export default async function () {
  try {
    await mongoose.connect('mongodb://mongodb:27017/bs')
    logInfo('Mongo DB Connected!', 'server', 'db')
  } catch (err) {
    logError('Mongo DB Connection Error ' + e, 'server', 'db')
  }
}

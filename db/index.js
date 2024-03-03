/** @format */

import mongoose from 'mongoose'
import { logInfo, logError } from '@/api/logger'

mongoose
  .connect('mongodb://mongodb:27017/bs')
  .then((idx) => {
    logInfo(`Mongo DB Connected!`, 'server', 'db')
  })
  .catch((err) => {
    logError('Mongo DB Connection Error ' + err, 'server', 'db')
  })

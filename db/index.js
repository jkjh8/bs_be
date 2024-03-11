/** @format */

import mongoose from 'mongoose'
import { logInfo, logError } from '@/api/logger'

mongoose
  .connect('mongodb://mongodb:27017/bs') // 주소 변경
  .then(() => {
    logInfo(`Mongo DB Connected!`, 'server', 'db')
  })
  .catch((err) => {
    logError('Mongo DB Connection Error ' + err, 'server', 'db')
  })

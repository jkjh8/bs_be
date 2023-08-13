/** @format */

import mongoose from 'mongoose'
import logger from '@/api/logger'

export default async function () {
  try {
    await mongoose.connect('mongodb://mongodb:27017/bs')
    logger.info('Mongo DB Connected!')
  } catch (err) {
    logger.error('Mongo DB Connection Error ' + e)
  }
}

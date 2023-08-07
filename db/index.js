/** @format */

import mongoose from 'mongoose'
import logger from '../logger'

mongoose
  .connect('mongodb://mongodb:27017/bs', {
    useNewUrlParser: true
  })
  .then(() => {
    logger.info('Mongo DB Connected!')
  })
  .catch((e) => {
    logger.error('Mongo DB Connection Error ' + e)
  })

export default db

/** @format */

const mongoose = require('mongoose')
const logger = require('../logger')

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

module.exports = db

/** @format */

import winston from 'winston'
import 'winston-mongodb'

import moment from 'moment'
moment.locale('ko')

const logFormat = winston.format.printf((info) => {
  return `${udpateTimeZone(info.timestamp)} ${info.level}: ${info.message}`
})

const udpateTimeZone = (time) => {
  return moment(time).format('LLL')
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.MongoDB({
      db: 'mongodb://mongodb:27017/bs',
      collection: 'logs',
      options: {
        useUnifiedTopology: true
      }
    })
  ]
})

// add prodution mode
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        logFormat
      )
    })
  )
}
export default logger

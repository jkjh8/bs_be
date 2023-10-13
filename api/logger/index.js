/** @format */

import winston from 'winston'
import CustomMongo from './wCustom'
import 'winston-mongodb'

import moment from 'moment'
moment.locale('ko')

const config = {
  levels: {
    // 숫자가 낮을 수록 우선순위가 높습니다.
    error: 0,
    debug: 1,
    warn: 2,
    info: 3,
    data: 4,
    event: 5,
    custom: 6
  },
  colors: {
    // 각각의 레벨에 대한 색상을 지정해줍니다.
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    info: 'green',
    data: 'magenta',
    event: 'cyan',
    custom: 'yellow'
  }
}

const logFormat = winston.format.printf((info) => {
  return `${udpateTimeZone(info.timestamp)} ${info.level} ${
    info.source ? `- ${info.source}` : ''
  }${info.category ? ` - ${info.category}` : ''} -- ${info.message}`
})

const udpateTimeZone = (time) => {
  return moment(time).format('LLL')
}

const logger = winston.createLogger({
  levels: config.levels,
  transports: [new CustomMongo({ level: 'custom' })]
})

// add prodution mode
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      levels: config.levels,
      level: 'custom',
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        logFormat
      )
    })
  )
}

function logError(message, source = '', category = '') {
  logger.log({ level: 'error', levelNum: 0, message, source, category })
}
function logDebug(message, source = '', category = '') {
  logger.log({ level: 'debug', levelNum: 1, message, source, category })
}
function logWarn(message, source = '', category = '') {
  logger.log({ level: 'warn', levelNum: 2, message, source, category })
}
function logInfo(message, source = '', category = '') {
  logger.log({ level: 'info', levelNum: 3, message, source, category })
}
function logData(message, source = '', category = '') {
  logger.log({ level: 'data', levelNum: 4, message, source, category })
}
function logEvent(message, source = '', category = '') {
  logger.log({ level: 'event', levelNum: 5, message, source, category })
}
function logCustom(message, source = '', category = '') {
  logger.log({ level: 'custom', levelNum: 6, message, source, category })
}

export default logger
export { logError, logDebug, logWarn, logInfo, logData, logEvent, logCustom }

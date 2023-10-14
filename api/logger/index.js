/** @format */

import winston from 'winston'
import Transport from 'winston-transport'
import Logs from '@/db/models/logs'
import 'winston-mongodb'

const timezoned = () => {
  return new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
}

class CustomMongo extends Transport {
  constructor(opts) {
    super(opts)
  }

  log(info, cb) {
    setImmediate(async () => {
      await Logs.create({ ...info })
      this.emit('logged', info)
    })
    cb()
  }
}

// log config and color
const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    info: 3,
    data: 4,
    event: 5,
    custom: 6
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    info: 'green',
    data: 'magenta',
    event: 'cyan',
    custom: 'yellow'
  }
}

// console.log format
const logFormat = winston.format.printf((info) => {
  return `${info.timestamp} ${info.level} ${info.source ? `- ${info.source}` : ''}${
    info.category ? ` - ${info.category}` : ''
  } -- ${info.message}`
})

// logger mongodb
const logger = winston.createLogger({
  levels: config.levels,
  transports: [new CustomMongo()]
})

// add prodution mode show console.log
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      levels: config.levels,
      level: 'custom',
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: timezoned }),
        logFormat
      )
    })
  )
}

// logger functions
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

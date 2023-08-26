import logger from './index'
import Eventlog from '@/db/models/eventLogs'

const addELog = async (args) => {
  try {
    const d = {
      source: args.source,
      level: args.level,
      priority: args.priority ?? 'info',
      user: args.user,
      zones: args.zones,
      message: args.message
    }
    const elog = new Eventlog(d)
    await elog.save()
    logger.info(`Eventlog added :${d}`)
    return d
  } catch (error) {
    logger.error(`Eventlog add error ${error}`)
  }
}

export { addELog }

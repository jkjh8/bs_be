import logger from './index'
import Eventlog from '@/db/models/eventlog'

const addELog = async (args) => {
  try {
    const d = {
      source: args.source,
      level: args.level ?? 'info',
      priority: args.priority,
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

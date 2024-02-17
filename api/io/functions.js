import QSys from '@/db/models/qsys'
import Barix from '@/db/models/barix'
import { io } from '@/app'
import { logInfo, logWarn, logError, logDebug } from '@/api/logger'

async function deviceListSendtoSocket () {
  try {
    io.emit('devices:list', JSON.stringify({ qsys: await QSys.find(), barix: await Barix.find()}))
  } catch (error) {
    logError(`socket error send device list - ${error}`, 'server', 'hardware')
  }
}

export {deviceListSendtoSocket}
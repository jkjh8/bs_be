import { io } from '@/app'
import { logInfo, logWarn, logError, logDebug } from '@/api/logger'
import { qsysFind, qsysUpdate, qsysFindOne } from '@/db/functions/qsys'
// import qsys from '../../db/models/qsys'

async function sendQsysDevices() {
  io.emit('qsys:devices', JSON.stringify(await qsysFind({})))
}

async function sendQsysDevice(deviceId) {
  io.emit('qsys:device', JSON.stringify(await QSys.find({ deviceId })))
}

export { sendQsysDevice, sendQsysDevices }

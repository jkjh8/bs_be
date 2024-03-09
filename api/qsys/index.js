import { io } from '@/app'
import { logInfo, logWarn, logError, logDebug } from '@/api/logger'
import { qsysFind, qsysUpdate, qsysFindOne } from '@/db/functions/qsys'
// import qsys from '../../db/models/qsys'

async function sendQsysDevices() {
  io.emit('qsys:devices', await qsysFind())
}

async function sendQsysDevice(deviceId) {
  io.emit('qsys:device', JSON.stringify(await QSys.find({ deviceId })))
}

const broadcastQsysZoneStatus = (socket, deviceId, ZoneStatus) => {
  socket.broadcast.emit('qsys:ZoneStatus', { deviceId, ZoneStatus })
}

const socketSendQsysDevices = async (socket) => {
  socket.emit('qsys:deivces', await qsysFind())
}
export {
  sendQsysDevice,
  sendQsysDevices,
  broadcastQsysZoneStatus,
  socketSendQsysDevices
}

import { io } from '@/app'
import { logInfo, logWarn, logError, logDebug } from '@/api/logger'
import {
  qsysFindAll,
  qsysFind,
  qsysUpdate,
  qsysFindOne
} from '@/db/functions/qsys'
// import qsys from '../../db/models/qsys'

async function fnSendQsysDevices() {
  io.emit('qsys:devices', await qsysFindAll())
}

async function fnSendQsysDevice(deviceId) {
  io.emit('qsys:device', JSON.stringify(await QSys.find({ deviceId })))
}

const fnBroadcastQsysZoneStatus = (socket, deviceId, ZoneStatus) => {
  socket.broadcast.emit('qsys:ZoneStatus', { deviceId, ZoneStatus })
}

const fnSocketSendQsysDevices = async (socket) => {
  socket.emit('qsys:deivces', await qsysFind())
}
export {
  fnSendQsysDevice,
  fnSendQsysDevices,
  fnBroadcastQsysZoneStatus,
  fnSocketSendQsysDevices
}

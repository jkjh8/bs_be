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

const fnSendQsysRefreshZoneAll = (deviceId) => {
  io.emit('qsys:refreshAll', { deviceId })
}

const fnSendQsysZone = (deviceId, zone, destination, ipaddress) => {
  io.emit('qsys:zone', { deviceId, zone, destination, ipaddress })
}

const fnCancelAll = (deviceId) => {
  io.emit('qsys:cancelAll', { deviceId })
}

export {
  fnSendQsysDevice,
  fnSendQsysDevices,
  fnBroadcastQsysZoneStatus,
  fnSocketSendQsysDevices,
  fnSendQsysRefreshZoneAll,
  fnSendQsysZone,
  fnCancelAll
}

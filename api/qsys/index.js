import { bridge } from '@/io/bridge'
import { clients } from '@/io/client'
import { logInfo, logWarn, logError, logDebug } from '@/api/logger'
import {
  qsysFindAll,
  qsysFind,
  qsysUpdate,
  qsysFindOne
} from '@/db/functions/qsys'
// import qsys from '../../db/models/qsys'

async function fnSendQsysDevices() {
  const r = await qsysFindAll()
  bridge.emit('qsys:devices', r)
  clients.emit('qsys:devices', r)
}

async function fnSendQsysDevice(deviceId) {
  io.emit('qsys:device', JSON.stringify(await qsysFind({ deviceId })))
}

const fnBroadcastQsysZoneStatus = (socket, deviceId, ZoneStatus) => {
  clients.emit('qsys:ZoneStatus', { deviceId, ZoneStatus })
}

const fnSocketSendQsysDevices = async (socket) => {
  socket.emit('qsys:devices', await qsysFindAll())
}

const fnSendQsysRefreshZoneAll = (deviceId) => {
  bridge.emit('qsys:refreshAll', { deviceId })
}

const fnSendQsysZone = (deviceId, zone, destination, ipaddress) => {
  bridge.emit('qsys:zone', { deviceId, zone, destination, ipaddress })
}

const fnCancelAll = (deviceId) => {
  bridge.emit('qsys:cancelAll', { deviceId })
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

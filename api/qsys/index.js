import QSys from '@/db/models/qsys'
import Bridge from '@/db/models/bridge'
import { io } from '@/app'
import { logInfo, logWarn, logError, logDebug } from '@/api/logger'
import { qsysUpdate, qsysFindOne } from '@/db/functions/qsys'
// import qsys from '../../db/models/qsys'

let qsysData

async function qsysDataParser(socket, args) {
  console.log(args)
  let r
  try {
    const { deviceId, key } = args
    switch (key) {
      case 'connect':
        await qsysUpdate({ deviceId }, { connected: true })
        await sendQsysDevices()
        logInfo(
          `qsys device connected ${args.name}:${args.ipaddress}-${args.deviceId}`,
          'q-sys',
          'connect'
        )
        break
      case 'disconnect':
        r = qsysFindOne({ deviceId })
        if (r && r.connected) {
          await qsysUpdate({ deviceId }, { connected: false })
          await sendQsysDevices()
          logWarn(
            `qsys device disconnected ${args.name}:${args.ipaddress}-${args.deviceId}`,
            'q-sys',
            'connect'
          )
        }
        break
      case 'EngineStatus':
        await qsysUpdate({ deviceId }, { EngineStatus: args.EngineStatus })
        logDebug(`Updated from qsys ${deviceId} EngineStatus`, 'q-sys', 'data')
        break
      case 'ZoneStatus':
        await qsysUpdate({ deviceId }, { ZoneStatus: args.ZoneStatus })
        logDebug(`Updated from qsys ${deviceId} ZoneStatus`, `q-sys`, `data`)
        io.emit(
          'qsys:data',
          JSON.stringify({
            key: 'ZoneStatus',
            deviceId,
            ZoneStatus: args.ZoneStatus
          })
        )
        break
      case 'GainAndMute':
        await qsysUpdate({ deviceId }, { ZoneStatus: args.ZoneStatus })
        logDebug(`Updated from qsys ${deviceId} Gain&Mute`, `q-sys`, `data`)
        io.emit(
          'qsys:data',
          JSON.stringify({
            key: 'ZoneStatus',
            deviceId,
            ZoneStatus: args.ZoneStatus
          })
        )
        // await qsysUpdate({ deviceId }, { ZoneStatus: args.ZoneStatus })
        break
      case 'PaConfig':
        await qsysUpdate({ deviceId }, { PaConfig: args.value })
        logDebug(`Updated from qsys ${deviceId} PA Config`, `q-sys`, `data`)
        break
      case 'ZoneStatusConfigure':
        await qsysUpdate({ deviceId }, { ZoneStatusConfigure: args.value })
        logDebug(
          `Updated from qsys ${deviceId} ZoneStatus Configure updated`,
          'q-sys',
          'data'
        )
        break
      case 'page:message':
        await qsysUpdate({ deviceId }, { PageID: args.PageID })
        logDebug(
          `Q-SYS DeviceID ${deviceId} page:message started pageId ${args.PageID}`,
          'q-sys',
          'page'
        )
        break
      case 'page:live':
        await qsysUpdate({ deviceId }, { PageID: args.PageID })
        logDebug(
          `Q-SYS DeviceID ${deviceId} page:live started pageId ${args.PageID}`,
          'q-sys',
          'page'
        )
        break
      default:
        console.log('qsys parser default: ', args)
        break
    }
    sendQsysDevice(deviceId)
  } catch (err) {
    logError(`qsys data parser error ${err}`, 'q-sys', 'data')
  }
}

function qsysSend(socket, key, value) {
  socket.emit('qsys:data', JSON.stringify({ key, value }))
}

async function sendQsysDevices() {
  io.emit('qsysDevices', JSON.stringify(await QSys.find({})))
}

async function sendQsysDevice(deviceId) {
  io.emit('qsysUpdateDevice', JSON.stringify(await QSys.find({ deviceId })))
}

async function qsysDeviceSendBySocketId(key) {
  // const bridge = await Bridge.findOne({ type: 'qsys' })
  const qsysBridge = io.sockets.sockets.get(bridge.socket)
  qsysBridge.emit(
    'qsys:data',
    JSON.stringify({ key, value: await QSys.find({}) })
  )
}
export {
  qsysData,
  qsysDataParser,
  qsysSend,
  sendQsysDevice,
  sendQsysDevices,
  qsysDeviceSendBySocketId
}

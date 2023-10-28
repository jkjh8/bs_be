import QSys from '@/db/models/qsys'
import Bridge from '@/db/models/bridge'
import { io } from '@/app'
import { logInfo, logWarn, logError, logDebug } from '@/api/logger'
// import qsys from '../../db/models/qsys'

let qsysData

async function qsysDataParser(socket, args) {
  console.log(args)
  let r
  try {
    const { deviceId, key } = args
    switch (key) {
      case 'connect':
        await QSys.findOneAndUpdate({ deviceId }, { connected: true })
        await sendQsysDevices()
        logInfo(
          `qsys device connected ${args.name}:${args.ipaddress}-${args.deviceId}`,
          'q-sys',
          'connect'
        )
        break
      case 'disconnect':
        r = QSys.findOne({ deviceId })
        if (r && r.connected) {
          await QSys.findOneAndUpdate({ deviceId }, { connected: false })
          await sendQsysDevices()
          logWarn(
            `qsys device disconnected ${args.name}:${args.ipaddress}-${args.deviceId}`,
            'q-sys',
            'connect'
          )
        }
        break
      case 'EngineStatus':
        await QSys.findOneAndUpdate({ deviceId }, { EngineStatus: args.EngineStatus })
        logDebug(`Updated from qsys ${deviceId} EngineStatus`, 'q-sys', 'data')
        break
      case 'ZoneStatus':
        await QSys.findOneAndUpdate({ deviceId }, { ZoneStatus: args.ZoneStatus })
        logDebug(`Updated from qsys ${deviceId} ZoneStatus`, `q-sys`, `data`)
        break
      case 'GainAndMute':
        await QSys.findOneAndUpdate({ deviceId }, { ZoneStatus: args.ZoneStatus })
        logDebug(`Updated from qsys ${deviceId} Gain&Mute`, `q-sys`, `data`)
        io.emit(
          'qsys:data',
          JSON.stringify({ key: 'ZoneStatus', deviceId, ZoneStatus: args.ZoneStatus })
        )
        // await QSys.findOneAndUpdate({ deviceId }, { ZoneStatus: args.ZoneStatus })
        break
      case 'PaConfig':
        await QSys.findOneAndUpdate({ deviceId }, { PaConfig: args.value })
        logDebug(`Updated from qsys ${deviceId} PA Config`, `q-sys`, `data`)
        break
      case 'ZoneStatusConfigure':
        await QSys.findOneAndUpdate({ deviceId }, { ZoneStatusConfigure: args.value })
        logDebug(`Updated from qsys ${deviceId} ZoneStatus Configure updated`, 'q-sys', 'data')
        break
      case 'page:message':
        await QSys.findOneAndUpdate({ deviceId }, { PageID: args.PageID })
        logDebug(
          `Q-SYS DeviceID ${deviceId} page:message started pageId ${args.PageID}`,
          'q-sys',
          'page'
        )
        break
      case 'page:live':
        await QSys.findOneAndUpdate({ deviceId }, { PageID: args.PageID })
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
  const bridge = await Bridge.findOne({ type: 'qsys' })
  const qsysBridge = io.sockets.sockets.get(bridge.socket)
  qsysBridge.emit('qsys:data', JSON.stringify({ key, value: await QSys.find({}) }))
}
export {
  qsysData,
  qsysDataParser,
  qsysSend,
  sendQsysDevice,
  sendQsysDevices,
  qsysDeviceSendBySocketId
}

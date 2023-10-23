import QSys from '@/db/models/qsys'
import { logInfo, logWarn, logError, logDebug } from '@/api/logger'

let qsysData

async function qsysDataParser(socket, args) {
  console.log(args)
  try {
    const { deviceId, key } = args
    switch (key) {
      case 'connect':
        await QSys.findOneAndUpdate({ deviceId }, { connected: true })
        await qsysDeviceSend(socket, 'connect')
        logInfo(
          `qsys device connected ${args.name}-${args.ipaddress}-${args.deviceId}`,
          'q-sys',
          'connect'
        )
        break
      case 'disconnect':
        const r = QSys.findOne({ deviceId })
        if (r && r.connected) {
          await QSys.findOneAndUpdate({ deviceId }, { connected: false })
          await qsysDeviceSend(socket, 'devices')
          logWarn(
            `qsys device disconnected ${args.name}-${args.ipaddress}-${args.deviceId}`,
            'q-sys',
            'connect'
          )
        }
        break
      case 'RtByMethod':
        const obj = {}
        if (args.ZoneStatus) {
          obj.ZoneStatus = args.ZoneStatus
        }
        if (args.EngineStatus) {
          obj.EngineStatus = args.EngineStatus
        }
        await QSys.findOneAndUpdate({ deviceId }, { ...obj })
        logDebug(`Updated from qsys ${deviceId}`, `server`, `data`)
        break
      case 'GainAndMute':
        await QSys.findOneAndUpdate({ deviceId }, { ZoneStatus: args.ZoneStatus })
        break
      case 'PaConfig':
        await QSys.findOneAndUpdate({ deviceId }, { PaConfig: args.PaConfig })
        break
      default:
        console.log('qsys parser default: ', args)
    }
  } catch (err) {
    logError(`qsys data parser error ${err}`, 'q-sys', 'data')
  }
}

function qsysSend(socket, key, value) {
  socket.emit('qsys:data', JSON.stringify({ key, value }))
}

async function qsysDeviceSend(socket, key) {
  socket.emit('qsys:data', JSON.stringify({ key, value: await QSys.find({}) }))
}

export { qsysData, qsysDataParser, qsysSend, qsysDeviceSend }

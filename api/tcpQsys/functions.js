import QSys from '@/db/models/qsys'
import { io } from '@/app'
import { logInfo, logWarn, logError, logDebug } from '@/api/logger'
import { writeTcpSockets } from '.'

export default async function tcpcommands(commands) {
  try {
    const {comm, deviceId, value} = JSON.parse(commands)
    switch(comm) {
      case 'qsys:get':
        qsysDeviceListSendByTcp()
      break
      // connect and disconnect
      case 'qsys:connect':
        await QSys.findOneAndUpdate({ deviceId }, { connected: true })
        logInfo(
          `qsys device connected ${args.name}:${args.ipaddress}-${args.deviceId}`,
          'q-sys',
          'connect'
        )
        // device update send
        io.emit('qsys:data', JSON.stringify({deviceId, connected: true}))
        break
      case 'qsys:disconnect':
        r = QSys.findOne({ deviceId })
        if (r && r.connected) {
          await QSys.findOneAndUpdate({ deviceId }, { connected: false })
          logWarn(
            `qsys device disconnected ${args.name}:${args.ipaddress}-${args.deviceId}`,
            'q-sys',
            'connect'
          )
        }
        io.emit('qsys:data', JSON.stringify({deviceId, connected: false}))
        break
      // qsys status
      case 'qsys:EngineStatus':
        await QSys.findOneAndUpdate({ deviceId }, { EngineStatus: value })
        logDebug(`Updated from qsys ${deviceId} EngineStatus`, 'q-sys', 'data')
      break
      case 'qsys:ZoneStatus':
        await QSys.findOneAndUpdate({ deviceId }, { ZoneStatus: value })
        logDebug(`Updated from qsys ${deviceId} ZoneStatus`, `q-sys`, `data`)
        // broadcast qsys zone and status data
        io.emit(
          'qsys:data',
          JSON.stringify({ key: 'ZoneStatus', deviceId, ZoneStatus: value })
        )
      break
      case 'qsys:GainAndMute':
        await QSys.findOneAndUpdate({ deviceId }, { ZoneStatus: value })
        logDebug(`Updated from qsys ${deviceId} Gain&Mute`, `q-sys`, `data`)
        // broadcast qsys zone and status data
        io.emit(
          'qsys:data',
          JSON.stringify({ key: 'ZoneStatus', deviceId, ZoneStatus: value })
        )
      break
      case 'qsys:PaConfig':
        await QSys.findOneAndUpdate({ deviceId }, { PaConfig: value })
        logDebug(`Updated from qsys ${deviceId} PA Config`, `q-sys`, `data`)
        break
      case 'qsys:ZoneStatusConfigure':
        await QSys.findOneAndUpdate({ deviceId }, { ZoneStatusConfigure: value })
        logDebug(`Updated from qsys ${deviceId} ZoneStatus Configure updated`, 'q-sys', 'data')
        break
      // pa
      case 'qsys:page:message':
        await QSys.findOneAndUpdate({ deviceId }, { PageID: args.PageID })
        logDebug(
          `Q-SYS DeviceID ${deviceId} page:message started pageId ${args.PageID}`,
          'q-sys',
          'page'
        )
        break
      case 'qsys:page:live':
        await QSys.findOneAndUpdate({ deviceId }, { PageID: args.PageID })
        logDebug(
          `Q-SYS DeviceID ${deviceId} page:live started pageId ${args.PageID}`,
          'q-sys',
          'page'
        )
        break

    }

  } catch (error) {
    logError(`tcp commands error - ${error}`, 'server', 'q-sys')
  }
}

async function qsysDeviceListSendByTcp() {
  try {
    writeTcpSockets({comm: 'qsys:devices', value: await QSys.find()})
  } catch (error) {
    logError(`Qsys device list send by tcp error - ${error}`)
  }
}

export { qsysDeviceListSendByTcp }
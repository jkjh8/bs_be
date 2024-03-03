import QSys from '@/db/models/qsys'
import { io } from '@/app'
import { logInfo, logWarn, logError, logDebug } from '@/api/logger'
import { writeTcpSockets } from '.'
import { qsysUpdate, qsysFindOne } from '@/db/functions/qsys'

export default async function tcpcommands(commands) {
  try {
    const { comm, deviceId, value } = JSON.parse(commands)
    switch (comm) {
      case 'qsys:get':
        qsysDeviceListSendByTcp()
        break
      // connect and disconnect
      case 'qsys:connect':
        await qsysUpdate({ deviceId }, { connected: true })
        logInfo(
          `QSYS 장치 연결 ${args.name}:${args.ipaddress}-${args.deviceId}`,
          'q-sys',
          'connect'
        )
        // device update send
        io.emit('qsys:data', JSON.stringify({ deviceId, connected: true }))
        break
      case 'qsys:disconnect':
        r = qsysFindOne({ deviceId })
        if (r && r.connected) {
          await qsysUpdate({ deviceId }, { connected: false })
          logWarn(
            `QSYS 장치 연결해제 ${args.name}:${args.ipaddress}-${args.deviceId}`,
            'q-sys',
            'connect'
          )
        }
        io.emit('qsys:data', JSON.stringify({ deviceId, connected: false }))
        break
      // qsys status
      case 'qsys:EngineStatus':
        await qsysUpdate({ deviceId }, { EngineStatus: value })
        logDebug(`QSYS 업데이트 ${deviceId} EngineStatus`, 'q-sys', 'data')
        break
      case 'qsys:ZoneStatus':
        await qsysUpdate({ deviceId }, { ZoneStatus: value })
        logDebug(`QSYS 업데이트 ${deviceId} ZoneStatus`, `q-sys`, `data`)
        // broadcast qsys zone and status data
        io.emit(
          'qsys:data',
          JSON.stringify({ key: 'ZoneStatus', deviceId, ZoneStatus: value })
        )
        break
      case 'qsys:GainAndMute':
        await qsysUpdate({ deviceId }, { ZoneStatus: value })
        logDebug(`QSYS 업데이트 ${deviceId} Gain&Mute`, `q-sys`, `data`)
        // broadcast qsys zone and status data
        io.emit(
          'qsys:data',
          JSON.stringify({ key: 'ZoneStatus', deviceId, ZoneStatus: value })
        )
        break
      case 'qsys:PaConfig':
        await qsysUpdate({ deviceId }, { PaConfig: value })
        logDebug(`QSYS 업데이트 ${deviceId} PA Config`, `q-sys`, `data`)
        break
      case 'qsys:ZoneStatusConfigure':
        await qsysUpdate({ deviceId }, { ZoneStatusConfigure: value })
        logDebug(
          `QSYS 업데이트 ${deviceId} ZoneStatus Configure updated`,
          'q-sys',
          'data'
        )
        break
      // pa
      case 'qsys:page:message':
        await qsysUpdate({ deviceId }, { PageID: args.PageID })
        logDebug(
          `QSYS ${deviceId} 메시지 방송시작 pageId ${args.PageID}`,
          'q-sys',
          'page'
        )
        break
      case 'qsys:page:live':
        await qsysUpdate({ deviceId }, { PageID: args.PageID })
        logDebug(
          `QSYS ${deviceId} 라이브 방송시작 pageId ${args.PageID}`,
          'q-sys',
          'page'
        )
        break
    }
  } catch (error) {
    logError(`QSYS 명령 오류 - ${error}`, 'server', 'q-sys')
  }
}

async function qsysDeviceListSendByTcp() {
  try {
    writeTcpSockets({ comm: 'qsys:devices', value: await QSys.find() })
  } catch (error) {
    logError(`QSYS 장치 리스트 송신 오류: ${error}`)
  }
}

export { qsysDeviceListSendByTcp }

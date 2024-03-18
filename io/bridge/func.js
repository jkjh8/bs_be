import {
  fnSendQsysDevice,
  fnSendQsysDevices,
  fnBroadcastQsysZoneStatus,
  fnSocketSendQsysDevices
} from '@/api/qsys'

import {
  qsysUpdate,
  qsysFindOne,
  qsysFindOneAndUpdate
} from '@/db/functions/qsys'

export default async function qsysParser(socket) {
  socket.on('qsys:connect', async (device) => {
    const { deviceId } = device
    await qsysUpdate({ deviceId }, { connected: true })
  })

  socket.on('qsys:disconnect', async (device) => {
    const { deviceId } = device
    await qsysUpdate({ deviceId }, { connected: false })
    await fnSendQsysDevices()
  })

  socket.on('qsys:EngineStatus', async (args) => {
    console.log(args)
    const { deviceId, EngineStatus } = args
    await qsysUpdate({ deviceId }, { EngineStatus })
    await fnSendQsysDevices()
  })

  socket.on('qsys:ZoneStatus', async (args) => {
    const { deviceId, ZoneStatus } = args
    await qsysUpdate({ deviceId }, { ZoneStatus })
    fnBroadcastQsysZoneStatus(socket, deviceId, ZoneStatus)
  })

  socket.on('qsys:GainMute', async (args) => {
    const { deviceId, ZoneStatus } = args
    await qsysUpdate({ deviceId }, { ZoneStatus })
    fnBroadcastQsysZoneStatus(socket, deviceId, ZoneStatus)
  })

  socket.on('qsys:PaConfig', async (args) => {
    const { deviceId, PaConfig } = args
    await qsysUpdate({ deviceId }, { PaConfig })
    await fnSendQsysDevices()
  })

  socket.on('qsys:ZoneStatusConfigure', async (args) => {
    const { deviceId, ZoneStatusConfigure, channel, ZoneStatus } = args
    // 채널 길이 지정
    const zone = await qsysFindOne({ deviceId })
    const newZone = zone.ZoneStatus
    newZone.length = channel
    for (let i = 0; i < newZone.length; i++) {
      newZone[i] = { ...newZone[i], ...ZoneStatus[i] }
    }
    await qsysUpdate({ deviceId }, { ZoneStatus: newZone, ZoneStatusConfigure })
    // 상태 업데이트
    await fnSendQsysDevices()
  })

  socket.on('qsys:page:message', async (args) => {
    const { deviceId, PageID } = args
    await qsysUpdate({ deviceId }, { PageID })
  })

  socket.on('qsys:page:live', async (args) => {
    const { deviceId, PageID } = args
    await qsysUpdate({ deviceId }, { PageID })
  })
  socket.on('qsys:page:stop', (deviceId) => {
    // page stop
  })
  socket.on('qsys:page:cancel', (deviceId) => {
    // page cancel
  })

  // socket.on('qsys:volume', (args) => {
  //   socket.broadcast.emit('qsys:volume', args)
  // })

  // socket.on('qsys:mute', (args) => {
  //   socket.broadcast.emit('qsys:mute', args)
  // })

  socket.on('device:get', () => {
    fnSendQsysDevices()
  })
}

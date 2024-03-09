import {
  sendQsysDevice,
  sendQsysDevices,
  broadcastQsysZoneStatus
} from '@/api/qsys'
import { qsysUpdate } from '@/db/functions/qsys'

export default async function qsysParser(socket) {
  socket.on('qsys:connect', async (device) => {
    const { deviceId } = device
    await qsysUpdate({ deviceId }, { connected: true })
    // await qsysUpdate({ deviceId: device.deviceId }, { connected: true })
    await sendQsysDevices()
  })

  socket.on('qsys:disconnect', async (device) => {
    const { deviceId } = device
    await qsysUpdate({ deviceId }, { connected: false })
    await sendQsysDevices()
  })

  socket.on('qsys:EngineStatus', async (args) => {
    console.log(args)
    const { deviceId, EngineStatus } = args
    await qsysUpdate({ deviceId }, { EngineStatus })
    await sendQsysDevices()
  })

  socket.on('qsys:ZoneStatus', async (args) => {
    const { deviceId, ZoneStatus } = args
    await qsysUpdate({ deviceId }, { ZoneStatus })
    broadcastQsysZoneStatus(socket, deviceId, ZoneStatus)
  })

  socket.on('qsys:GainMute', async (args) => {
    const { deviceId, ZoneStatus } = args
    await qsysUpdate({ deviceId }, { ZoneStatus })
    broadcastQsysZoneStatus(socket, deviceId, ZoneStatus)
  })

  socket.on('qsys:PaConfig', async (args) => {
    const { deviceId, PaConfig } = args
    await qsysUpdate({ deviceId }, { PaConfig })
    await sendQsysDevices()
  })

  socket.on('qsys:ZoneStatusConfigure', async (args) => {
    const { deviceId, ZoneStatusConfigure } = args
    await qsysUpdate({ deviceId }, { ZoneStatusConfigure })
    await sendQsysDevices()
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

  socket.on('qsys:volume', (args) => {
    socket.broadcast.emit('qsys:volume', args)
  })

  socket.on('qsys:mute', (args) => {
    socket.broadcast.emit('qsys:mute', args)
  })

  socket.on('device:get', () => {
    sendQsysDevices()
  })
}

import { sendQsysDevice, sendQsysDevices } from '../../api/qsys'
import { qsysUpdate } from '../db/functions/qsys'

export default async function qsysParser(socket) {
  socket.on('qsys:connect', async (device) => {
    await qsysUpdate({ deviceId: device.deviceId }, { connected: true })
    await sendQsysDevices()
  })

  socket.on('qsys:disconnect', async (device) => {
    await qsysUpdate({ deviceId: device.deviceId }, { connected: false })
    await sendQsysDevices()
  })

  socket.on('qsys:EngineStatus', async (args) => {
    const { deviceId, EnginStatus } = args
    await qsysUpdate({ deviceId }, { EnginStatus })
    await sendQsysDevices()
  })

  socket.on('qsys:ZoneStatus', async (args) => {
    const { deviceId, ZoneStatus } = args
    await qsysUpdate({ deviceId }, { ZoneStatus })
    await sendQsysDevices()
  })

  socket.on('qsys:GainMute', async (args) => {
    const { deviceId, ZoneStatus } = args
    await qsysUpdate({ deviceId }, { ZoneStatus })
    await sendQsysDevices()
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
}

import Device from '@/db/models/device'
import { logInfo, logWarn, logError } from '@/api/logger'

let qsysData

async function qsysDataParser(obj, socket) {
  console.log(obj)
  try {
    const { deviceId, name, ipaddress, value, data } = obj
    switch (obj.key) {
      case 'connect':
        await Device.findOneAndUpdate({ deviceId }, { connected: true })
        await qsysDeviceSend(socket, 'connect')
        logInfo(`qsys device connected ${name} - ${ipaddress} -- ${deviceId}`, 'q-sys', 'connect')
        break
      case 'disconnect':
        await Device.findOneAndUpdate({ deviceId }, { connected: false })
        await qsysDeviceSend(socket, 'devices')
        logWarn(`qsys device disconnected ${name} - ${ipaddress} -- ${deviceId}`, 'q-sys', 'connect')
        break
      case 'RtByMethod':
        break
      default:
        console.log('qsys parser default: ', obj)
    }
  } catch (err) {
    logError(`qsys data parser error ${err}`, 'q-sys', 'data')
  }
}

function qsysSend(socket, key, value) {
  socket.emit('qsys:data', JSON.stringify({ key, value }))
}

async function qsysDeviceSend(socket, key) {
  socket.emit('qsys:data', JSON.stringify({ key, value: await Device.find({ 'deviceType.deviceType': 'Q-SYS' }) }))
}

export { qsysData, qsysDataParser, qsysSend, qsysDeviceSend }

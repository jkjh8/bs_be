import Device from '@/db/models/device'
import logger from '@/api/logger'

let qsysData

async function qsysDataParser(obj, socket) {
  console.log(obj)
  try {
    const { deviceId, name, ipaddress, value, data } = obj
    switch (obj.key) {
      case 'connect':
        await Device.findOneAndUpdate({ deviceId }, { connected: true })
        logger.info(
          `qsys device connected ${name} - ${ipaddress} -- ${deviceId}`
        )
        socket.emit(
          'qsys:data',
          JSON.stringify({
            key: 'connect',
            value: await Device.find({ 'deviceType.deviceType': 'Q-SYS' })
          })
        )
        break
      case 'disconnect':
        await Device.findOneAndUpdate({ deviceId }, { connected: false })
        logger.warn(
          `qsys device disconnected ${name} - ${ipaddress} -- ${deviceId}`
        )
        socket.emit(
          'qsys:data',
          JSON.stringify({
            key: 'devices',
            value: await Device.find({ 'deviceType.deviceType': 'Q-SYS' })
          })
        )
        break
    }
  } catch (err) {
    logger.error(`qsys data parser error ${err}`)
  }
}

export { qsysData, qsysDataParser }

import { io } from '@/app'
import { qsysFind } from '@/db/functions/qsys'
import { qsysFindOne } from '@/db/functions/qsys'

const sendQsysDevices = async () => {
  return io.emit('qsys:devices', await qsysFind())
}

const sendQsysDevice = async (deviceId) => {
  return io.emit('qsys:device', await qsysFindOne({ deviceId }))
}

export { sendQsysDevices, sendQsysDevice }

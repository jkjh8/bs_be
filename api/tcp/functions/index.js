import QSys from '@/db/models/qsys'
import { logInfo, logWarn, logError, logDebug } from '@/api/logger'
import { writeTcpSockets } from '..'

export default async function tcpcommands(commands) {
  try {
    const {comm, value} = JSON.parse(commands)
    switch(comm) {
      case 'qsys:get':
        qsysDeviceListSendByTcp()
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
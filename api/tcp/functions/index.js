import QSys from '@/db/models/qsys'
import { logInfo, logWarn, logError, logDebug } from '@/api/logger'
import { writeTcpSockets } from '..'

export default async function tcpcommands(commands) {
  try {
    const {comm, value} = JSON.parse(commands)
    switch(comm) {
      case 'qsys:get':
        writeTcpSockets({comm: 'qsys:devices', value:await QSys.find()})
      break
    }

  } catch (error) {
    
  }
}
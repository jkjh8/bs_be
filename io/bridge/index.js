import { logInfo, logDebug, logWarn, logError } from '@/api/logger'
import { qsysFindAll } from '@/db/functions/qsys'
import { fnSocketSendQsysDevices } from '@/api/qsys'

import fromQsys from './func'

let bridge
const initbridgeSock = (io) => {
  bridge = io.of('/bridge')
  bridge.on('connection', async (socket) => {
    logDebug(`Socket.IO Bridge 연결 ${socket.id}`, 'server', 'socket.io')

    socket.on('disconnect', (reason) => {
      logDebug(`Socket.IO Bridge 연결해제 ${socket.id}`, 'server', 'socket.io')
    })
    // functions
    fromQsys(socket)
    await fnSocketSendQsysDevices(socket)
  })
  logInfo(`Socket.IO Bridge 시작`, 'server', 'socket.io')
}

export { bridge, initbridgeSock }

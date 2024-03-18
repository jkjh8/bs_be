import { logInfo, logDebug, logWarn, logError } from '@/api/logger'
import { fnSocketSendQsysDevices } from '@/api/qsys'
import clientParser from '@/io/client/func'
let clients
const initClientSock = (io) => {
  clients = io.of('/clients')
  clients.use(async (socket, next) => {
    const session = socket.request.session
    const token = socket.handshake.auth.token
    if (token) {
      return next()
    }
    if (session && session.passport && session.passport.user) {
      return next()
    }
    socket.emit('Not authenticated')
    next(new Error('Not authenticated'))
  })

  clients.on('connection', async (socket) => {
    logDebug(`socket client connected ${socket.id}`, 'server', 'socket.io')

    socket.on('disconnect', (reason) => {
      logDebug(`socket client disconnected ${socket.id}`, 'server', 'socket.io')
    })
    clientParser(socket)
    await fnSocketSendQsysDevices(socket)
  })
  logInfo(`socket clients start`, 'server', 'socket.io')
}

export { clients, initClientSock }

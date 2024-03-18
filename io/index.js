/** @format */

import { logInfo, logWarn, logError } from '@/api/logger'
import { fnSendQsysDevices, fnSocketSendQsysDevices } from '../api/qsys'

import { initClientSock } from './client'
import { initbridgeSock } from './bridge'
const initIO = (io) => {
  initClientSock(io)
  initbridgeSock(io)
  // session middleware
  // io.use(async (socket, next) => {
  //   const session = socket.request.session
  //   const token = socket.handshake.auth.token
  //   if (token) {
  //     return next()
  //   }
  //   if (session && session.passport && session.passport.user) {
  //     return next()
  //   }
  //   socket.emit('Not authenticated')
  //   next(new Error('Not authenticated'))
  // })

  // io.on('connection', async (socket) => {
  //   const req = socket.request
  //   const headers = req.headers

  //   if (headers.type && headers.type === 'qsys') {
  //     sStatus.qsysConnect = true
  //     logInfo(`QSYS 브릿지 연결`, 'server', 'socket.io')
  //     fnSendQsysDevices()
  //   }
  //   // 큐시스 파서
  //   fromQsys(socket)

  //   // disconnected
  //   socket.on('disconnect', async (reason) => {
  //     if (headers.type && headers.type === 'qsys') {
  //       sStatus.qsysConnect = false
  //       logWarn(`QSYS 브릿지 연결 해제`, 'server', 'socket.io')
  //     }
  //   })

  //   //
  //   fnSocketSendQsysDevices(socket)
  // })
  // logInfo(`Socket.IO 활성화`, 'server', 'socket.io')
}

export { initIO }

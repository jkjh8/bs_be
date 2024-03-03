/** @format */

import { logInfo, logWarn, logError } from '@/api/logger'
import { deviceListSendtoSocket } from './functions'

const initIO = (io) => {
  // session middleware
  io.use(async (socket, next) => {
    const session = socket.request.session
    const token = socket.handshake.auth.token
    if (token && (await Bridge({ id: token }))) {
      // console.log('device checked ', token)
      return next()
    }
    if (session && session.passport && session.passport.user) {
      return next()
    }
    socket.emit('Not authenticated')
    next(new Error('Not authenticated'))
  })

  io.on('connection', async (socket) => {
    console.log('some device connect')
    const req = socket.request
    const headers = req.headers

    // nomal user connected and logged
    const email = req.session.passport.user.email
    logInfo(
      `Socket.io connected -- ${socket.id} ${email}`,
      'server',
      'socket.io'
    )
    deviceListSendtoSocket()

    // disconnected
    socket.on('disconnect', async (reason) => {
      // if (headers.type && headers.type === 'qsys') {
      //   // update qsys bridge status and socket id
      //   await Bridge.findOneAndUpdate(
      //     { type: 'qsys' },
      //     { connected: false, socket: null }
      //   )
      //   // logged
      //   return logWarn(
      //     `Socket.io disconnected -- ${socket.id} ${reason}`,
      //     'server',
      //     'socket.io'
      //   )
      // }
      // nomal user disconnected
      logWarn(
        `Socket.io USER-INTERFACE disconnected -- ${socket.id} ${reason}`,
        'server',
        'socket.io'
      )
    })
  })
  logInfo(`Init Socket.io`, 'server', 'socket.io')
}

export { initIO }

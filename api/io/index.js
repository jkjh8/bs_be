/** @format */

import logger from '@/api/logger'
import Bridge from '@/db/models/bridge'

let socketio

const initIO = (io) => {
  socketio = io
  // session middleware
  io.use(async (socket, next) => {
    const session = socket.request.session
    const token = socket.handshake.auth.token
    if (token && (await Bridge({ id: token }))) {
      console.log('device checked ', token)
      return next()
    }
    if (session && session.passport && session.passport.user) {
      return next()
    }
    next(new Error('Not authenticated'))
  })

  io.on('connection', (socket) => {
    const req = socket.request
    const session = req.session
    const passport = req.session.passport
    logger.info(
      `Socket.io connected -- ${socket.id} ${
        passport && passport.user.email ? passport.user.email : ''
      }`
    )
    socket.on('disconnect', (reason) => {
      logger.info(
        `Socket.io USER-INTERFACE disconnected -- ${socket.id} ${reason}`
      )
    })
  })
}

export { initIO }

/** @format */

import logger from '@/api/logger'
import Bridge from '@/db/models/bridge'
import Device from '@/db/models/device'
import { qsysDataParser } from '../qsys'

let qsysSocket = null

const initIO = (io) => {
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
    socket.emit('Not authenticated')
    next(new Error('Not authenticated'))
  })

  io.on('connection', (socket) => {
    const req = socket.request
    const session = req.session
    const passport = session.passport
    // qsys bridge
    if (req.headers.type && req.headers.type === 'qsys') {
      qsysSocket = socket
      logger.info(`Socket.io Q-SYS connected -- ${qsysSocket.id}`)
    } else {
      // nomal user
      logger.info(
        `Socket.io connected -- ${socket.id} ${
          passport && passport.user.email ? passport.user.email : ''
        }`
      )
    }
    socket.on('disconnect', (reason) => {
      logger.info(
        `Socket.io USER-INTERFACE disconnected -- ${socket.id} ${reason}`
      )
    })

    socket.on('qsys:data', (msg) => {
      console.log('get data')
      qsysDataParser(JSON.parse(msg))
    })

    socket.on('qsys:devices', async () => {
      socket.emit(
        'qsys:data',
        JSON.stringify({
          command: 'devices',
          value: await Device.find({ 'deviceType.deviceType': 'Q-SYS' })
        })
      )
    })
  })
  logger.info(`init socket.io`)
}

export { initIO, qsysSocket }

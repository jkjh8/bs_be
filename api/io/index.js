/** @format */

import { logInfo, logWarn, logError } from '@/api/logger'
import Bridge from '@/db/models/bridge'
import Device from '@/db/models/device'
import { qsysDataParser, qsysDeviceSend } from '../qsys'
import bridgeParser from './bridge'

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

    // qsys bridge
    if (headers.type && headers.type === 'qsys') {
      await Bridge.findOneAndUpdate({ type: 'qsys' }, { connected: true, socket: socket.id })
      await qsysDeviceSend('connect')
      logInfo(`Socket.io Q-SYS connected -- ${socket.id}`, 'server', 'socket.io')
    } else {
      // nomal user
      const email = req.session.passport.user.email
      await qsysDeviceSend('devices')
      logInfo(`Socket.io connected -- ${socket.id} ${email}`, 'server', 'socket.io')
    }
    socket.on('disconnect', async (reason) => {
      if (headers.type && headers.type === 'qsys') {
        await Bridge.findOneAndUpdate({ type: 'qsys' }, { connected: false, socket: null })

        return logWarn(`Socket.io disconnected -- ${socket.id} ${reason}`, 'server', 'socket.io')
      }
      logWarn(
        `Socket.io USER-INTERFACE disconnected -- ${socket.id} ${reason}`,
        'server',
        'socket.io'
      )
    })

    socket.on('bridge', (msg) => {
      bridgeParser(JSON.parse(msg), socket)
    })

    socket.on('qsys', (msg) => {
      qsysDataParser(socket, JSON.parse(msg))
    })
  })
  logInfo(`Init Socket.io`, 'server', 'socket.io')
}

export { initIO }

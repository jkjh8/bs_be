import { writeFile } from 'fs'
// logger
import logger from '@/api/logger'
import { addELog } from '@/api/logger/eventlog'
// db
import Bridge from '@/db/models/bridge'
import Device from '@/db/models/device'

let io_qsys
let sockets = []

const initQsysIo = (io) => {
  io_qsys = io.of('/qsys')

  // set middleware
  io_qsys.use(async (socket, next) => {
    // const req = socket.request
    // TODO: only allow registered devices
    // socket.handshake
    next()
  })

  io_qsys.on('connection', async (socket) => {
    const { uid, type } = socket.request.headers
    const r = await Bridge.findOne({ id: uid })
    if (!r) {
      socket.disconnect(true)
      logger.error(`Socket.IO Q-SYS disconnected! unregistered device `)
    }
    if (type !== 'qsys') {
      socket.disconnect(true)
      logger.error(`Socket.IO Q-SYS disconnected! not match device type`)
    }

    socket.on('disconnect', (reason) => {
      const idx = sockets.indexOf(socket)
      if (idx > -1) sockets.splice(idx, 1)
      logger.info(`Socket.IO Q-SYS Disconnect -- ${socket.id} ${reason}`)
    })

    socket.on('data', (args) => {
      commands(socket, args)
    })

    socket.emit('data', {
      command: 'devices',
      data: await Device.find({ 'deviceType.deviceType': 'Q-SYS' })
    })
    logger.info(`Socket.IO Q-SYS Connected -- ${socket.id}`)
    sockets.push(socket)
  })
}

async function commands(socket, args) {
  switch (args.command) {
    case 'getStatus':
      socket.emit({
        command: 'devices',
        data: await Device.find({ 'deviceType.deviceType': 'Q-SYS' })
      })
      break
  }
}

export { initQsysIo }

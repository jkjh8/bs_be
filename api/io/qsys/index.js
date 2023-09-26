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
    const { deviceid, type } = socket.request.headers
    // console.log(socket.request.headers)
    const r = await Bridge.findOne({ id: deviceid })
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
      console.log(sockets.length)
      logger.info(`Socket.IO Q-SYS Disconnect -- ${socket.id} ${reason}`)
    })

    socket.on('data', (args) => {
      commands(socket, args)
    })
    // emit data devices
    socket.emit(
      'data',
      JSON.stringify({
        command: 'devices',
        value: await Device.find({ 'deviceType.deviceType': 'Q-SYS' })
      })
    )

    logger.info(`Socket.IO Q-SYS Connected -- ${socket.id}`)
    sockets.push(socket)
    console.log(sockets.length)
  })
}

async function commands(socket, obj) {
  switch (obj.command) {
    case 'devices':
      socket.emit(
        'data',
        JSON.stringify({
          command: 'devices',
          value: await Device.find({ 'deviceType.deviceType': 'Q-SYS' })
        })
      )
      break
    case 'connect':
      await Device.updateOne({ _id: obj.value._id }, { connected: true })
      socket.emit(
        'data',
        JSON.stringify({
          command: 'devices',
          value: await Device.find({ 'deviceType.deviceType': 'Q-SYS' })
        })
      )
      break
    case 'disconnect':
      await Device.updateOne({ _id: obj.value._id }, { connected: false })
      socket.emit(
        'data',
        JSON.stringify({
          command: 'devices',
          value: await Device.find({ 'deviceType.deviceType': 'Q-SYS' })
        })
      )
      break
    case 'logger':
      await addELog(obj.value)
  }
}

export { initQsysIo }

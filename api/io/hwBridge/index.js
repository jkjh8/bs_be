import logger from '@/api/logger'
import { addELog } from '@/api/logger/eventlog'
import Bridge from '@/db/models/bridge'
import path from 'path'
import { writeFile } from 'fs'
import db from '../../../db'
import Device from '@/db/models/device'
let io_device

const initDeviceIo = (io) => {
  io_device = io.of('/device')

  // set middleware
  io_device.use(async (socket, next) => {
    const req = socket.request
    // TODO: only allow registered devices
    // socket.handshake
    next()
  })

  io_device.on('connection', async (socket) => {
    const req = socket.request
    const r = await Bridge.findOne({ id: req.headers.apikey })
    if (r && r.id) {
      socket.emit('devices', await Device.find())
      logger.info(
        `Socket.io device connected type: ${r.type} socket: ${socket.id} uuid: ${r.id}`
      )
    } else {
      socket.disconnect(true)
      logger.info(`Socket.io device disconnected not allowed`)
    }

    // file upload

    socket.on('upload', (file, callback) => {
      console.log(file)
      writeFile(file.name, file.data, (err) => {
        callback({ message: err ? 'failure' : 'success' })
      })
    })
    // disconnect
    socket.on('disconnect', (reason) => {
      logger.info(`Socket.io device disconnected: ${socket.id} ${reason}`)
    })
    // devices
    socket.on('getDevices', async () => {
      logger.info(`get device list type:${req.headers.type} id:${socket.id}`)
      socket.emit('devices', await Device.find())
    })

    // eventlog
    socket.on('eventlog', async (args) => {
      await addELog(args)
    })

    // TODO: req.session.count ++; req.session.save();
  })
}

export { io_device, initDeviceIo }

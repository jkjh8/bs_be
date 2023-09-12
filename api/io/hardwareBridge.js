import logger from '@/api/logger'
import Bridge from '@/db/models/bridge'
import path from 'path'
import { writeFile } from 'fs'

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
        callback({ message:err ? 'failure': 'success'})
      })
    })
    // disconnect
    socket.on('disconnect', (reason) => {
      logger.info(`Socket.io device disconnected: ${socket.id} ${reason}`)
    })
    // TODO: req.session.count ++; req.session.save();
  })
}

export { io_device, initDeviceIo }

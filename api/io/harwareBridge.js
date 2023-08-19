import logger from '@/api/logger'

let io_device

const initDeviceIo = (io) => {
  io_device = io.of('/ui')

  // set middleware
  io_device.use((socket, next) => {
    const req = socket.request
    // TODO: only allow registered devices
    // socket.handshake
    next()
  })

  io_device.on('connection', (socket) => {
    const req = socket.request
    logger.info(`Socket.io device connected: ${socket.id}`)
    socket.on('disconnect', (reason) => {
      logger.info(`Socket.io device disconnected: ${socket.id} ${reason}`)
    })
    // TODO: req.session.count ++; req.session.save();
  })
}

export { io_device, initDeviceIo }

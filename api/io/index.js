/** @format */

import logger from '@/api/logger'

let io_ui, io_device

const initIO = (io) => {
  io_ui = io.of('/ui')
  io_device = io.of('/device')
  // io ui init
  io_ui.on('connection', (socket) => {
    logger.info(`socket.io connected ui: ${socket.id}`)
    // add socket returns
    socket.on('disconnect', () => {
      logger.info(`socket.io disconnected ui: ${socket.id}`)
    })
  })

  // io device init
  io_device.on('connection', (socket) => {
    logger.info(`socket.io connected device: ${socket.id}`)
    // add socket returns
    socket.on('disconnect', () => {
      logger.info(`socket.io disconnected device: ${socket.id}`)
    })
  })
}

export { initIO, io_ui, io_device }

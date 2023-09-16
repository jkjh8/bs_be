import logger from '@/api/logger'

let io_ui

const initUserinterfaceIo = (io) => {
  io_ui = io.of('/ui')

  // set middleware
  io_ui.use((socket, next) => {
    const session = socket.request.session
    if (session && session.passport && session.passport.user) {
      next()
    } else {
      next(new Error('Not authenticated'))
    }
    // TODO: only allow authenticated users
    // console.log(req)
    // socket.session.passport.user
    // next()
  })

  io_ui.on('connection', (socket) => {
    const req = socket.request
    logger.info(
      `Socket.io user connected: ${socket.id} ${req.session.passport.user.email}`
    )
    socket.on('disconnect', (reason) => {
      logger.info(`Socket.io user disconnected: ${socket.id} ${reason}`)
    })
    // TODO: req.session.count ++; req.session.save();
  })
}

export { io_ui, initUserinterfaceIo }

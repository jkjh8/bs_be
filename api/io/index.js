/** @format */

import logger from '@/api/logger'

let io_ui, io_device

const initIO = (io, sessionMiddleware) => {
  // session middleware
  // const wrap = (middleware) => (socket, next) =>
  //   middleware(socket.request, {}, next)
  // io.engine.use(sessionMiddleware)

  // namespace
  io_ui = io.of('/ui')
  io_device = io.of('/device')

  // io.use(wrap(sessionMiddleware))

  // only allow authenticated users
  io_ui.use((socket, next) => {
    const req = socket.request
    console.log('middleware', req.session, 'id:', req.session.id, req)
    next()
    // const session = socket.request.session
    // if (session && session.authenticated) {
    //   console.log(session)
    //   next()
    // } else {
    //   next(new Error('unauthorized'))
    // }
    // next()
  })

  // io ui init
  io_ui.on('connection', (socket) => {
    const req = socket.request
    logger.info(`socket.io connected ui: ${socket.id}`)

    // add socket returns
    socket.on('disconnect', () => {
      logger.info(`socket.io disconnected ui: ${socket.id}`)
    })
    // TODO: req.session.count ++; req.session.save();
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

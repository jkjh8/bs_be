/** @format */

import path from 'path'
import https from 'https'
// http
import http from 'http'
import { Server } from 'socket.io'
import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import corsOptions from './api/cors.js'
import session from 'express-session'
import sessionOptions from './api/session.js'
import passport from 'passport'
import passportConfig from './api/user/passport.js'
// db
import connectMongoose from './db'
import Setup from './db/models/setup.js'
// loggers
import loggerWeb from 'morgan'
import { logInfo, logError } from './api/logger/index.js'
// routes
import indexRouter from './routes/index.js'
// io routes
import { initIO } from './api/io'
import { connectTcpServer } from './api/tcpQsys'

// files
import initFolders from './system/setFolder.js'

// setup
import initSetup from './system/initSetup.js'

// mongoose connected
connectMongoose()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  maxHttpBufferSize: 1e8 // file transfer limit 100MB
})

/********************** middleware **********************/
app.use(loggerWeb('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('./public'))

// session
const sessionMiddleware = session(sessionOptions)
app.use(sessionMiddleware)

// cors
app.use(cors(corsOptions))

// passport config
passportConfig()
app.use(passport.initialize())
app.use(passport.session())

// init socket.io
io.engine.use(sessionMiddleware)
initIO(io)

// static
initFolders(app)
app.use(express.static(path.resolve(__dirname, 'public', 'spa')))
app.use('/media', express.static(mediaPath.media))
/************************ routes ************************/
app.use('/', indexRouter)

/******************* error process **********************/
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404))
// })

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })

// app start server
try {
  server.listen(3000, () => {
    logInfo('Web Server Listenning to port 3000', 'server', 'boot')
  })
} catch (err) {
  logError('Web Server not opend', 'server', 'boot')
}

// global variables

global.sStatus = {
  ttsAddress: 'http://127.0.0.1:9998',
  tcpServerPort: 9997,
  tcpServerStatus: false
}

// get setup data from db
initSetup()
export default app
export { io }

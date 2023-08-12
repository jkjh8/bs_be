/** @format */

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
// loggers
import loggerWeb from 'morgan'
import logger from './api/logger/index.js'
// routes
import indexRouter from './routes/index.js'
// io routes
import { initIO } from './api/io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

/********************** middleware **********************/
app.use(loggerWeb('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('./public'))
app.use(session(sessionOptions))

// cors
app.use(cors(corsOptions))

/************************ routes ************************/
app.use('/', indexRouter)
// init socket.io
initIO(io)

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
    logger.info('Web Server Listenning to port 3000')
  })
} catch (err) {
  logger.error('Web Server not opend')
}

export default app

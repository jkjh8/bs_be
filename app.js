/** @format */

// http
const http = require('http')
const { Server } = require('socket.io')
const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { corsOptions } = require('./api/cors.js')
const session = require('express-session')
const { sessionOptions } = require('./api/session.js')
// loggers
const loggerWeb = require('morgan')
const logger = require('./api/logger/index.js')
// routes
const indexRouter = require('./routes/index.js')
// io routes
const { initIO } = require('./api/io')

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

module.exports = app

/** @format */
import * as url from 'url'
import http from 'http'
import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'

global.__filename = url.fileURLToPath(import.meta.url)
global.__dirname = url.fileURLToPath(new URL('.', import.meta.url))

const app = express()
const server = http.createServer(app)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// app start server
server.listen(3000, () => {
  const addr = server.address()
  console.log('Web Server Listenning to ' + addr.port)
})

export default app

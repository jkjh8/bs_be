/** @format */

import MongoStore from 'connect-mongo'

export default {
  secret: process.env.SESSION_PASS,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://mongodb:27017/bs',
    mongoOptions: { useUnifiedTopology: true }
  })
}

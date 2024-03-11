/** @format */
import dotenv from 'dotenv'
import MongoStore from 'connect-mongo'

dotenv.config()
export default {
  secret: process.env.SESSION_PASS,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/bs',
    mongoOptions: { useUnifiedTopology: true }
  })
}

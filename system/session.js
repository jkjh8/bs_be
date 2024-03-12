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
    mongoUrl: process.env.MONGODB_ADDR, // 주소변경
    mongoOptions: { useUnifiedTopology: true }
  })
}

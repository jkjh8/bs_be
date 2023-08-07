/** @format */

import mongoose from 'mongoose'

mongoose
  .connect('mongodb://mongodb:27017/bs', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Mongo DB Connected!')
  })
  .catch((e) => {
    console.error('Mongo DB Connection Error ' + e)
  })

export default db

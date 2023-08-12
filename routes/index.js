/** @format */

import express from 'express'
import api from './api'

const router = express.Router()

// use router
router.use('/api', api)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello World')
})

export default router

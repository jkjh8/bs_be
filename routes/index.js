/** @format */

const express = require('express')
const router = express.Router()

// use router
router.use('/api', require('./api'))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello World')
})

module.exports = router

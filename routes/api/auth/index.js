const express = require('express')

const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    console.log(req.body)
    res.status(200).json({ result: true })
    
  } catch (err) {
    res.status(500).json(err)
  }


})


module.exports = router

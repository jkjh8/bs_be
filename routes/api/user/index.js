const express = require('express')
const User = require('../../../db/models/user')

const router = express.Router()

router.get('/get_user', async (req, res) => {
  try {
    const { email } = req.query
    const r = await User.findOne({ email: email }, { userPassword: false })
    res.status(200).json({ result: true, user: r.email})
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router

import express from 'express'
import logger from '@/api/logger'
import User from '@/db/models/user'
import { isloggedin } from '@/api/user/isLoggedin'

const router = express.Router()

router.get('/', isloggedin, async (req, res) => {
  // check admin for admin functions
  try {
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ result: false, message: 'do not have permision to access' })
    }

    const users = await User.find({}, { userPassword: 0 })
    res.status(200).json({ result: true, users })
  } catch (err) {
    logger.error(`get users error: ${err}`)
    res.status(500).json({ result: false, error: err })
  }
})

module.exports = router

import express from 'express'
import logger from '@/api/logger'
import Bridge from '@/db/models/bridge'
import { isloggedin } from '@/api/user/isLoggedin'

const router = express.Router()

router.get('/', isloggedin, async (req, res) => {
  try {
    // check admin for admin functions
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ result: false, message: 'do not have permision to access' })
    }

    const r = await Bridge.find({}).exec()
    res.status(200).json({ result: true, bridge: r })
  } catch (err) {
    logger.error(`get bridge error: ${err}`)
    res.status(500).json({ result: false, error: err })
  }
})

router.post('/', isloggedin, async (req, res) => {
  try {
    // check admin for admin functions
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ result: false, message: 'do not have permision to access' })
    }
    const { type, id } = req.body.data
    const r = await Bridge.updateOne(
      { type: type },
      { $set: { id: id } },
      { upsert: true }
    )
    res.status(200).json({ result: true, data: r })
  } catch (err) {
    logger.error(`update bridge id error: ${err}`)
    res.status(500).json({ result: false, error: err })
  }
})

export default router

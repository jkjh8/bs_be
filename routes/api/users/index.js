import express from 'express'
import { logInfo, logError } from '@/api/logger'
import { userFind, userUpdate } from '@/db/functions/user'
import { isAdmin } from '@/api/user/isLoggedin'

const router = express.Router()

router.get('/', isAdmin, async (req, res) => {
  try {
    const users = await userFind({}, { userPassword: 0 })
    res.status(200).json({ result: true, users })
  } catch (err) {
    logger.error(`get users error: ${err}`)
    res.status(500).json({ result: false, error: err })
  }
})

router.put('/admin', async (req, res) => {
  try {
    const { _id, isAdmin } = req.body.user
    await userUpdate({ _id }, { isAdmin: !isAdmin })
    res.status(200).json({ result: true })
  } catch (error) {
    logError()
    res.status(500).json({ result: false, error: error })
  }
})

export default router

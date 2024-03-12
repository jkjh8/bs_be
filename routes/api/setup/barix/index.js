import express from 'express'
import Setup from '@/db/models/setup'
import { isAdmin } from '@/api/user/isLoggedin'
import { logInfo, logError } from '@/api/logger'

const router = express.Router()

router.get('/interval', (req, res) => {
  Setup.findOne({ key: 'interval' })
    .then((doc) => {
      if (doc && doc.valueNum) {
        return res.status(200).json({ result: true, value: doc.valueNum })
      }
      res.status(200).json({ result: true, value: sStatus.interval })
    })
    .catch((error) => {
      logError(`get http interval ${error}, 'server`, 'setup')
      res.status(500).json({ result: false, error })
    })
})

router.put('/interval', isAdmin, async (req, res) => {
  try {
    const { newInterval } = req.body
    await Setup.updateOne(
      { key: 'interval' },
      { valueNum: newInterval },
      { upsert: true }
    )
    // update global tts address
    logInfo(
      `change http interval to ${newInterval} by ${req.user.email}`,
      'server',
      'setup'
    )
    res.status(200).json({ result: true })
  } catch (error) {
    logError(`edit http interval ${error}`, 'server', 'setup')
    res.status(500).json({ result: false, error })
  }
})

export default router

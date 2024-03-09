import express from 'express'
import Setup from '@/db/models/setup'
import { isAdmin } from '@/api/user/isLoggedin'
import { logInfo, logError } from '@/api/logger'

const router = express.Router()

router.get('/gainstep', isAdmin, (req, res) => {
  Setup.findOne({ key: 'gainStep' })
    .then((doc) => {
      if (doc && doc.valueNum) {
        return res.status(200).json({ result: true, value: doc.valueNum })
      }
      res.status(200).json({ result: true, value: null })
    })
    .catch((error) => {
      logError(`get gain step error ${error}, 'server`, 'setup')
      res.status(500).json({ result: false, error })
    })
})

router.put('/gainstep', isAdmin, async (req, res) => {
  try {
    const { newGainStep } = req.body
    await Setup.updateOne(
      { key: 'gainStep' },
      { valueNum: newGainStep },
      { upsert: true }
    )
    // update global tts address
    logInfo(
      `change gain step to ${newGainStep} by ${req.user.email}`,
      'server',
      'setup'
    )
    res.status(200).json({ result: true })
  } catch (error) {
    logError(`edit gain step error ${error}`, 'server', 'setup')
    res.status(500).json({ result: false, error })
  }
})

export default router

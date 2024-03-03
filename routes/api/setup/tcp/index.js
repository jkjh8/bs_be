import express from 'express'
import Setup from '@/db/models/setup'
import { isAdmin } from '@/api/user/isLoggedin'
import { logInfo, logError, logDebug } from '@/api/logger'

const router = express.Router()

router.get('/port', isAdmin, (req, res) => {
  Setup.findOne({ key: 'tcpServerPort' })
    .then((doc) => {
      if (doc) {
        sStatus.tcpServerPort = doc.valueNum
      } else {
        Setup.create({
          key: 'tcpServerPort',
          valueNum: 9997
        }).exec()
      }
      sStatus.tcpServerPort = 9997
      res.status(200).json({ ...sStatus })
    })
    .catch((error) => {
      logError(`get tcp server port error ${error}`, 'server', 'setup')
      res.status(500).json({ result: false, error })
    })
})

router.put('/port', isAdmin, async (req, res) => {
  try {
    const { newPort } = req.body
    await Setup.findOneAndUpdate(
      { key: 'tcpServerPort' },
      { valueNum: newPort }
    )
    // update global tts address
    sStatus.tcpServerPort = newPort
    res.status(200).json({ result: true })
    logInfo(
      `change tcp server port to ${newPort} by ${req.user.email}`,
      'server',
      'setup'
    )
  } catch (error) {
    logError(`edit tts address error ${error}`, 'server', 'setup')
    res.status(500).json({ result: false, error })
  }
})

export default router

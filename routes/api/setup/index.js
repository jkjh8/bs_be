import express from 'express'
import Setup from '@/db/models/setup'
import { isAdmin } from '@/api/user/isLoggedin'
import { logInfo, logError, logDebug } from '@/api/logger'

const router = express.Router()

router.get('/ttsaddr', isAdmin, async (req, res) => {
  try {
    let r = await Setup.findOne({ key: 'ttsAddr' })
    if (!r) {
      await Setup.create({
        key: 'ttsAddr',
        ipaddress: 'http://127.0.0.1:9998'
      })
      r = await Setup.findOne({ key: 'ttsAddr' })
    }
    // update global tts address
    ttsAddr = r.ipaddress
    res.status(200).json({ ttsAddr })
  } catch (error) {
    logError(`get tts address error ${error}`, 'server', 'setup')
    res.status(500).json({ result: false, error })
  }
})

router.put('/ttsaddr', isAdmin, async (req, res) => {
  try {
    const { newName } = req.body
    await Setup.findOneAndUpdate({ key: 'ttsAddr' }, { ipaddress: newName })
    // update global tts address
    ttsAddr = newName
    res.status(200).json({ result: true })
    logInfo(
      `update tts server address to ${newName} by ${req.user.email}`,
      'server',
      'setup'
    )
  } catch (error) {
    logError(`edit tts address error ${error}`, 'server', 'setup')
    res.status(500).json({ result: false, error })
  }
})

export default router

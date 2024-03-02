import express from 'express'
import Setup from '@/db/models/setup'
import { isAdmin } from '@/api/user/isLoggedin'
import { logInfo, logError, logDebug } from '@/api/logger'

const router = express.Router()
router.get('/', (req, res) => {
  res.status(200).send('setup tts page')
})

router.get('/addr', isAdmin, async (req, res) => {
  try {
    let r = await Setup.findOne({ key: 'ttsAddress' })
    if (r) {
      sStatus.ttsAddress = r.value
    } else {
      await Setup.create({
        key: 'ttsAddress',
        value: 'http://127.0.0.1:9998'
      })
      sStatus.ttsAddress = 'http://127.0.0.1:9998'
    }
    res.status(200).json({ ...sStatus })
  } catch (error) {
    logError(`get tts address error ${error}`, 'server', 'setup')
    res.status(500).json({ result: false, error })
  }
})

router.put('/addr', isAdmin, async (req, res) => {
  try {
    const { newName } = req.body
    await Setup.findOneAndUpdate({ key: 'ttsAddress' }, { value: newName })
    // update global tts address
    sStatus.ttsAddress = newName
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

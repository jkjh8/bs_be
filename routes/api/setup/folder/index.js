import express from 'express'
import Setup from '@/db/models/setup'
import { isAdmin } from '@/api/user/isLoggedin'
import { logInfo, logError, logDebug } from '@/api/logger'

const router = express.Router()

router.get('/folder', isAdmin, (req, res) => {
  Setup.findOne({ key: 'mediaFolder' })
    .then((doc) => {
      if (doc) {
        sStatus.mediaFolder = doc.value
      }
      res.status(200).json({ ...sStatus })
    })
    .catch((error) => {
      logError(`미디어 폴더 찾기 오류: ${error}`, 'server', 'setup')
      res.status(500).json({ result: false, error })
    })
})

router.put('/folder', isAdmin, async (req, res) => {
  try {
    const { folder } = req.body
    await Setup.findOneAndUpdate({ key: 'mediaFolder' }, { value: folder })
    // update global tts address
    sStatus.mediaFolder = folder
    logInfo(
      `미디어 폴더 변경: ${newPort}, 사용자: ${req.user.email}`,
      'server',
      'setup'
    )
    res.status(200).json({ result: true })
  } catch (error) {
    logError(`미디어 폴더 변경 오류: ${error}`, 'server', 'setup')
    res.status(500).json({ result: false, error })
  }
})

export default router

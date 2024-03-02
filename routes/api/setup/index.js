import express from 'express'

import ttsPage from './tts'
import tcpPage from './tcp'

const router = express.Router()

router.use('/tts', ttsPage)
router.use('/tcp', tcpPage)

export default router

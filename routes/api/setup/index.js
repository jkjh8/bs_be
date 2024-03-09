import express from 'express'

import ttsPage from './tts'
import tcpPage from './tcp'
import qsys from './qsys'

const router = express.Router()

router.use('/tts', ttsPage)
router.use('/tcp', tcpPage)
router.use('/qsys', qsys)

export default router

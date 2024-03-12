import express from 'express'

import ttsPage from './tts'
import tcpPage from './tcp'
import qsys from './qsys'
import barix from './barix'

const router = express.Router()

router.use('/tts', ttsPage)
router.use('/tcp', tcpPage)
router.use('/qsys', qsys)
router.use('/barix', barix)

export default router

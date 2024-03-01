import express from 'express'
import auth from './auth'
import users from './users'
import bridge from './bridge'
import devices from './devices'
import logs from './logs'
import files from './files'
import setup from './setup'

const router = express.Router()

router.use('/users', users)
router.use('/auth', auth)
router.use('/bridge', bridge)
router.use('/devices', devices)
router.use('/logs', logs)
router.use('/files', files)
router.use('/setup', setup)

export default router

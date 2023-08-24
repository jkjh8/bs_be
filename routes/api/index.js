import express from 'express'
import auth from './auth'
import users from './users'
import bridge from './bridge'
import devices from './devices'

const router = express.Router()

router.use('/users', users)
router.use('/auth', auth)
router.use('/bridge', bridge)
router.use('/devices', devices)

export default router

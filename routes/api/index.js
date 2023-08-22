import express from 'express'
import auth from './auth'
import users from './users'
import bridge from './bridge'

const router = express.Router()

router.use('/users', users)
router.use('/auth', auth)
router.use('/bridge', bridge)

export default router

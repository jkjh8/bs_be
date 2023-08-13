import express from 'express'
import auth from './auth'
import users from './users'

const router = express.Router()

router.use('/users', users)
router.use('/auth', auth)

export default router

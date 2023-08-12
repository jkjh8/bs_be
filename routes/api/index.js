import express from 'express'
import auth from './auth/index.js'
import user from './user/index.js'


const router = express.Router()


router.use('/user', user)
router.use('/auth', auth)

export default router
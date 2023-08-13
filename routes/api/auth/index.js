import express from 'express'
import bcrypt from 'bcrypt'
// db models
import User from '@/db/models/user'
// local apis
import logger from '@/api/logger'

const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const { userName, userEmail, userPass } = req.body.auth
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(userPass, salt)
    const user = new User({
      name: userName,
      email: userEmail,
      userPassword: hash
    })
    await user.save()
    logger.info(`user singup success: ${user.email}`)
    res.status(200).json({ result: true })
  } catch (err) {
    logger.error(`user signup error: ${err}`)
    res.status(500).json(err)
  }
})

router.get('/exists_email', async (req, res) => {
  try {
    const { email } = req.query
    const r = await User.find({ email: email }, { userPassword: false })
    res.status(200).json({ result: true, user: r })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

export default router

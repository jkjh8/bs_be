import express from 'express'
import User from '@/db/models/user'
import logger from '@/api/logger'

const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    console.log(req.body)
    const { userName, userEmail, userPass } = req.body
    const user = new User({
      name: userName,
      email: userEmail,
      userPassword: userPass
    })
    const r = await user.save()
    console.log(r)
    logger.info(`user singup success: ${user.email}`)
    res.status(200).json({ result: true })
  } catch (err) {
    logger.error(`user signup error: ${err}`)
    res.status(500).json(err)
  }
})

router.get('/chk_email', async (req, res) => {
  try {
    const { email } = req.query
    const r = await User.findOne({ email: email }, { userPassword: false })
    res.status(200).json({ result: true, user: r.email })
  } catch (err) {
    res.status(500).json(err)
  }
})

export default router

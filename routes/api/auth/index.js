import express from 'express'
import bcrypt from 'bcrypt'
import passport from 'passport'
// db models
import User from '@/db/models/user'
// local apis
import logger from '@/api/logger'

const router = express.Router()

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user)
  }
  return res.send(null)
})

router.post('/', (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) return res.status(500).json({ err, info })
    if (!user) return res.status(401).json({ err, info })
    // success login
    req.login(user, async (err) => {
      user.numberOfLogins++
      user.loginAt = Date.now()
      await user.save()
      // return result
      res.status(200).json({ result: true, info })
    })
  })(req, res, next)
})

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
    logger.error(`check dub email error: ${err}`)
    res.status(500).json(err)
  }
})

router.get('/signout', async (req, res) => {
  req.logout((err) => {
    if (err) {
      logger.error(`user signout error: ${req.user.email} ${err}`)
      return res.status(500).json({ error: err })
    }
    req.session.destroy()
    res.status(200).json({ result: true, user: null })
  })
})

export default router

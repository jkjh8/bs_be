import express from 'express'
import bcrypt from 'bcrypt'
import passport from 'passport'
// db models
import User from '@/db/models/user'
// local apis
import { logInfo, logWarn, logError } from '@/api/logger'

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
    req.login(user, (err) => {
      if (err) {
        logError(`user login faild ${err}`, 'server', 'user')
        return next(err)
      }
      logInfo(`user login success: ${req.user.email}`, 'server', 'user')
      return res.status(200).json({ result: true, info })
    })
  })(req, res, next)
})

router.post('/signup', async (req, res) => {
  try {
    const { userName, userEmail, userPass } = req.body.auth
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(userPass, salt)
    await User.create({ name: userName, email: userEmail, userPassword: hash })
    logInfo(`user singup success: ${userEmail}`, 'server', 'user')
    res.status(200).json({ result: true })
  } catch (err) {
    logError(`user signup error: ${err}`, 'server', 'user')
    res.status(500).json(err)
  }
})

router.get('/exists_email', async (req, res) => {
  try {
    const { email } = req.query
    const r = await User.find({ email: email }, { userPassword: false }).exec()
    res.status(200).json({ result: true, user: r })
  } catch (err) {
    logError(`check dub email error: ${err}`, 'server', 'user')
    res.status(500).json(err)
  }
})

router.get('/signout', async (req, res) => {
  req.logout((err) => {
    if (err) {
      logWarn(`user signout error: ${req.user.email} ${err}`, 'server', 'user')
      return res.status(500).json({ error: err })
    }
    req.session.destroy()
    res.status(200).json({ result: true, user: null })
  })
})

export default router

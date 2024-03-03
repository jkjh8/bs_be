import express from 'express'
import bcrypt from 'bcrypt'
import passport from 'passport'
// db functions
import { makeUser, userFind } from '@/db/functions/user'
// local apis
import { logInfo, logWarn, logError } from '@/api/logger'
import makeUniqueId from '../../../api/uniqueId'

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
        logError(`사용자 로그인 실패 ${err}`, 'server', 'user')
        return next(err)
      }
      logInfo(`사용자 로그인: ${req.user.email}`, 'server', 'user')
      return res.status(200).json({ result: true, info })
    })
  })(req, res, next)
})

router.post('/signup', async (req, res) => {
  try {
    const { userName, userEmail, userPass } = req.body.auth
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(userPass, salt)
    await makeUser({
      name: userName,
      email: userEmail,
      userPassword: hash,
      folder: makeUniqueId(12)
    })
    logInfo(`사용자 계정 생성: ${userEmail}`, 'server', 'user')
    res.status(200).json({ result: true })
  } catch (err) {
    logError(`사용자 계정 생성 실패: ${err}`, 'server', 'user')
    res.status(500).json(err)
  }
})

router.get('/exists_email', async (req, res) => {
  try {
    const { email } = req.query
    const r = await userFind({ email: email }, { userPassword: false })
    res.status(200).json({ result: true, user: r })
  } catch (err) {
    logError(`이메일 중복 체크 오류: ${err}`, 'server', 'user')
    res.status(500).json(err)
  }
})

router.get('/signout', async (req, res) => {
  req.logout((err) => {
    if (err) {
      logWarn(
        `사용자 로그아웃 오류: ${req.user.email} ${err}`,
        'server',
        'user'
      )
      return res.status(500).json({ error: err })
    }
    req.session.destroy()
    res.status(200).json({ result: true, user: null })
  })
})

export default router

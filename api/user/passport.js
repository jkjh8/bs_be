/** @format */

import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
// db models
import User from '@/db/models/user.js'

export default function () {
  // serialize user to cookie
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  // serialize user to cookie
  passport.deserializeUser(async (user, done) => {
    try {
      const usr = await User.findOne(
        { email: user.email },
        { userPassword: 0, _id: 0 }
      )
      return done(null, usr)
    } catch (err) {
      return done(err, null)
    }
  })

  // login strategy
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'userPassword' },
      async (email, password, done) => {
        try {
          const usr = await User.findOne({ email: email })
          // not find user email
          if (!usr)
            return done(null, false, {
              message: '사용자를 찾을 수 없습니다. 이메일을 확인해 주세요'
            })
          // compare password and hash
          if (await bcrypt.compare(password, usr.userPassword)) {
            delete usr['userPassword']
            return done(null, usr, { message: '로그인 성공' })
          }
          // password not match
          return done(null, false, {
            message: '비밀번호가 일치 하지 않습니다. 다시 확인해 주세요'
          })
        } catch (err) {
          // some error from server
          return done(err, null, {
            message: '서버 오류가 발생했습니다. 잠시후 다시 시도해 주세요.'
          })
        }
      }
    )
  )
}

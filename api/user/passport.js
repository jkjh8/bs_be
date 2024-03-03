/** @format */

import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
// db funtions
import { userFindOne } from '../../db/functions/user'

export default function () {
  // serialize user to cookie
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  // serialize user to cookie
  passport.deserializeUser(async (user, done) => {
    try {
      const r = await userFindOne(
        { email: user.email },
        { userPassword: 0, _id: 0 }
      )
      return done(null, r)
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
          const user = await userFindOne({ email: email })
          // not find user email
          if (!user)
            return done(null, false, {
              message: '사용자를 찾을 수 없습니다. 이메일을 확인해 주세요'
            })
          // compare password and hash
          if (bcrypt.compare(password, user.userPassword)) {
            // seccess login db update
            user.numberOfLogins++
            user.loginAt = Date.now()
            await user.save()
            // user data except password
            const userExtPass = { ...user._doc }
            delete userExtPass.userPassword
            delete userExtPass._id

            return done(null, userExtPass, { message: '로그인 성공' })
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

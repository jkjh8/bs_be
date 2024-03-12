/** @format */

import mongoose from 'mongoose'
import { logInfo, logError } from '@/api/logger'

mongoose
  .connect('mongodb://mongodb:27017/bs') // 주소 변경
  .then(() => {
    logInfo(`데이터 베이스가 연결 되었습니다!`, 'server', 'db')
  })
  .catch((err) => {
    logError('데이터 베이스 연결 오류 ' + err, 'server', 'db')
  })

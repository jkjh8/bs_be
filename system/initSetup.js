import Setup from '../db/models/setup'
import { logError, logDebug } from '../api/logger/index.js'

export default async function () {
  try {
    const docs = await Setup.find()
    docs.forEach((item) => {
      switch (item.key) {
        case 'ttsAddress':
          sStatus.ttsAddress = item.value
          break
        case 'tcpServerPort':
          sStatus.tcpServerPort = item.valueNum
          break
        case 'mediaFolder':
          sStatus.mediaFolder = item.value
          break
      }
    })
    logDebug(
      `서버의 기본 데이터가 데이터베이스로 부터 업데이트 되었습니다.`,
      'server',
      'setup'
    )
  } catch (error) {
    logError(`서버 기본 데이터 갱신 오류: ${error}`, 'server', 'setup')
  }
}

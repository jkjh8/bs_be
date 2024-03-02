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
      }
    })
    logDebug(`initialization server setup data from db`, 'server', 'setup')
  } catch (error) {
    logError(
      `initialization server setup data error ${error}`,
      'server',
      'setup'
    )
  }
}

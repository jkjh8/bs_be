import path from 'path'
import { Worker } from 'worker_threads'
import { logInfo, logError, logDebug } from '@/api/logger'
import { barixFind, barixUpdate } from '../../db/functions/barix'

let barixGetInterval = null

// 개별 Barix 갱신 호출
const getBarixInfo = (ipaddr) => {
  const worker = new Worker(path.join(__dirname, 'worker.js'), {
    workerData: ipaddr
  })
  worker.on('message', async (data) => {
    await barixUpdate({ ipaddress: ipaddr }, { ...data })
    worker.terminate()
  })
  worker.on('error', async (err) => {
    logError(`barix http get ${JSON.stringify(err)}`, 'server', 'barix')
    worker.terminate()
  })
  worker.on('exit', (code) => {
    if (!code === 1) {
      logDebug(`barix exit code ${code}`, 'server', 'barix')
    }
  })
}

// 전체 Barix 갱신 호출
const getBarixes = async () => {
  const devices = await barixFind()
  devices.forEach((device) => {
    try {
      getBarixInfo(device.ipaddress)
    } catch (error) {
      if (device.deviceId) {
        barixUpdate({ deviceId: device.deviceId }, { status: false })
      }
    }
  })
}
// 인터벌 설정
const startIntervalGetBarix = () => {
  barixGetInterval = setInterval(() => {
    console.log('update barix')
    getBarixes()
  }, sStatus.interval * 1000)
}

const restartIntervalGetBarix = () => {
  clearInterval(barixGetInterval)
  startIntervalGetBarix()
}

export {
  getBarixInfo,
  getBarixes,
  barixGetInterval,
  startIntervalGetBarix,
  restartIntervalGetBarix
}

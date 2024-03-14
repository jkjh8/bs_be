import path from 'path'
import { Worker } from 'worker_threads'
import { logInfo, logError, logDebug } from '@/api/logger'
import { barixFind, barixUpdate } from '../../db/functions/barix'

let barixGetInterval = null

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

const getBarixes = async () => {
  const devices = await barixFind()
  devices.forEach((device) => getBarixInfo(device.ipaddress))
}

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

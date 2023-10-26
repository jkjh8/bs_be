import express from 'express'
import QSys from '@/db/models/qsys'
import { qsysDeviceSend } from '@/api/qsys'
import { logError, logEvent } from '@/api/logger'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    res.status(200).json({ result: true, devices: await QSys.find({}) })
  } catch (err) {
    logError(`qsys get devices error: ${err}`)
    res.status(500).json({ result: false, error: err })
  }
})

router.post('/', async (req, res) => {
  try {
    await QSys.create({ ...req.body })
    // add event log
    logEvent(
      `add new qsys device ${req.body.name}:${req.body.ipaddress}-${req.body.deviceId}`,
      req.user.email,
      'qsys'
    )
    await qsysDeviceSend('devices')
    res.status(200).json({ result: true })
  } catch (err) {
    logError(`qsys add device error: ${err}`)
    res.status(500).json({ result: false, error: err })
  }
})

router.delete('/', async (req, res) => {
  try {
    const r = await QSys.findByIdAndRemove(req.body._id)
    logEvent(
      `qsys device removed ${req.body.name}:${req.body.ipaddress}-${req.body.deviceId}`,
      req.user.email,
      'qsys'
    )
    await qsysDeviceSend('devices')
    res.status(200).json({ result: true, data: r })
  } catch (err) {
    logger.error(`qsys remove device error: ${err}`)
    res.status(500).json({ result: false, error: err })
  }
})

export default router

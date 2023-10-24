import express from 'express'
import QSys from '@/db/models/qsys'
import { qsysDeviceSendBySocketId } from '@/api/qsys'
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

// router.get('/uid', async function (req, res) {
//   try {
//     res.status(200).json({
//       result: true,
//       devices: await Devices.find({ id: req.query.id })
//     })
//   } catch (error) {
//     logger.error(`get device uid error: ${error}`)
//     res.status(500).json({ result: false, error: error })
//   }
// })

router.post('/', async (req, res) => {
  try {
    await QSys.create({ ...req.body })
    // add event log
    logEvent(
      `add new qsys device ${req.body.name}:${req.body.ipaddress}-${req.body.deviceId}`,
      req.user.email,
      'qsys'
    )
    await qsysDeviceSendBySocketId('devices')
    res.status(200).json({ result: true })
  } catch (err) {
    logError(`qsys add device error: ${err}`)
    res.status(500).json({ result: false, error: err })
  }
})

// router.get('/exists', async (req, res) => {
//   try {
//     const qsys = await QSys.exists({ ...req.query.value })
//     res.status(200).json({ result: qsys })
//   } catch (err) {
//     logger.error(`device exists error: ${err}`)
//     res.status(500).json({ result: false, error: err })
//   }
// })

router.delete('/', async (req, res) => {
  try {
    const r = await QSys.findByIdAndRemove(req.body._id)
    logEvent(
      `qsys device removed ${req.body.name}:${req.body.ipaddress}-${req.body.deviceId}`,
      req.user.email,
      'qsys'
    )
    await qsysDeviceSendBySocketId('devices')
    res.status(200).json({ result: true, data: r })
  } catch (err) {
    logger.error(`qsys remove device error: ${err}`)
    res.status(500).json({ result: false, error: err })
  }
})

export default router

import express from 'express'
import Barix from '@/db/models/barix'
// import { qsysDeviceSend } from '@/api/qsys'
import { logError, logEvent, logDebug } from '@/api/logger'
import { io } from '@/app'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    res.status(200).json({ result: true, devices: await Barix.find({}) })
  } catch (error) {
    logError(`barix get devices error - ${error}`, 'Barix', 'device')
    res.status(500).json({ result: false, error })
  }
})

router.post('/', async (req, res) => {
  try {
    await Barix.create({ ...req.body })
    // add event log
    logEvent(
      `add new Barix device ${req.body.name}:${req.body.ipaddress}-${req.body.deviceId}`,
      req.user.email,
      'barix'
    )
    // await qsysDeviceSend('devices')
    res.status(200).json({ result: true })
  } catch (error) {
    logError(`Barix add device error: ${error}`)
    res.status(500).json({ result: false, error })
  }
})

router.delete('/', async (req, res) => {
  try {
    const r = await Barix.findByIdAndRemove(req.body._id)
    logEvent(
      `Barix device removed ${req.body.name}:${req.body.ipaddress}-${req.body.deviceId}`,
      req.user.email,
      'Barix'
    )
    // await qsysDeviceSend('devices')
    res.status(200).json({ result: true, data: r })
  } catch (error) {
    logger.error(`qsys remove device error: ${error}`, 'Barix', 'device')
    res.status(500).json({ result: false, error })
  }
})

// router.put('/modifiedzonename', async (req, res) => {
//   try {
//     const { deviceId, zone, name } = req.body
//     await QSys.findOneAndUpdate(
//       { deviceId, 'ZoneStatus.Zone': zone },
//       { 'ZoneStatus.$.name': name }
//     )
//     logDebug(
//       `qsys deviceId: ${deviceId} zone name change ${zone}: ${name} by ${req.user.email}`,
//       'q-sys',
//       'data'
//     )
//     res.status(200).json({ result: true, devices: await QSys.find() })
//   } catch (error) {
//     logError(`qsys zone name change error: ${error}`)
//   }
// })

export default router

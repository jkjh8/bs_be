import express from 'express'
import Devices from '@/db/models/device'
import QSys from '@/db/models/qsys'
import logger from '@/api/logger'
import qsys from './qsys'
import barix from './barix'

const router = express.Router()

router.use('/qsys', qsys)
router.use('/barix', barix)

// router.get('/', async (req, res) => {
//   try {
//     res.status(200).json({ result: true, devices: await Devices.find({}) })
//   } catch (err) {
//     logger.error(`get qsys devices error: ${err}`)
//     res.status(500).json({ result: false, error: err })
//   }
// })

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

// router.post('/', async (req, res) => {
//   try {
//     const newDevice = new Devices({
//       ...req.body
//     })
//     await newDevice.save()
//     // add event log
//     await addELog({
//       priority: 'info',
//       user: req.user.email,
//       message: `device added: ${req.body.name} ${req.body.deviceType.deviceType} ${req.body.deviceType.model}  ${req.body.ipaddress} `
//     })
//     res.status(200).json({ result: true, deivce: newDevice })
//   } catch (err) {
//     logger.error(`add device error: ${err}`)
//     res.status(500).json({ result: false, error: err })
//   }
// })

// router.get('/exists', async (req, res) => {
//   console.log('/exists', req.query)
//   try {
//     const qsys = await QSys.exists({ ...req.query.value })
//     console.log(qsys)
//     res.status(200).json({ result: qsys })
//   } catch (err) {
//     logger.error(`device exists error: ${err}`)
//     res.status(500).json({ result: false, error: err })
//   }
// })

// router.delete('/', async (req, res) => {
//   try {
//     const r = await Devices.findByIdAndRemove(req.body._id)
//     await addELog({
//       user: req.user.email,
//       message: `device removed: ${req.body.name} ${req.body.deviceType.deviceType} ${req.body.deviceType.model} ${req.body.ipaddress} `
//     })
//     res.status(200).json({ result: true, data: r })
//   } catch (err) {
//     logger.error(`device remove error: ${err}`)
//     res.status(500).json({ result: false, error: err })
//   }
// })

export default router

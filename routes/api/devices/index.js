import express from 'express'
import Devices from '@/db/models/device'
import logger from '@/api/logger'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    res.status(200).json({ result: true, devices: await Devices.find({}) })
  } catch (err) {
    logger.error(`get devices error: ${err}`)
    res.status(500).json({ result: false, error: err })
  }
})

router.post('/', async (req, res) => {
  try {
    const newDevice = new Devices({
      ...req.body
    })
    await newDevice.save()
    res.status(200).json({ result: true, deivce: newDevice })
  } catch (err) {
    logger.error(`add device error: ${err}`)
    res.status(500).json({ result: false, error: err })
  }
})

router.get('/exists', async (req, res) => {
  try {
    res
      .status(200)
      .json({ result: await Devices.exists({ ...req.query.value }) })
  } catch (err) {
    logger.error(`device exists error: ${err}`)
    res.status(500).json({ result: false, error: err })
  }
})

router.get('/remove', async (req, res) => {
  try {
    const r = await Devices.findByIdAndRemove(req.query.id)
    res.status(200).json({ result: true, data: r })
  } catch (err) {
    logger.error(`device remove error: ${err}`)
    res.status(500).json({ result: false, error: err })
  }
})
export default router

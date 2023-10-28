import express from 'express'
import QSys from '@/db/models/qsys'
import { qsysDeviceSend } from '@/api/qsys'
import { logError, logEvent, logDebug } from '@/api/logger'
import { io } from '@/app'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    res.status(200).json({ result: true, devices: await QSys.find({}) })
  } catch (error) {
    logError(`qsys get devices error: ${error}`)
    res.status(500).json({ result: false, error })
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
  } catch (error) {
    logError(`qsys add device error: ${error}`)
    res.status(500).json({ result: false, error })
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
  } catch (error) {
    logger.error(`qsys remove device error: ${error}`)
    res.status(500).json({ result: false, error })
  }
})

router.put('/volume', async (req, res) => {
  try {
    const { deviceId, zone, value } = req.body
    await QSys.findOneAndUpdate(
      { deviceId, 'ZoneStatus.Zone': zone },
      { 'ZoneStatus.$.gain': value }
    )
    io.emit('qsys:command', JSON.stringify({ deviceId, command: 'changeVol', zone, value }))
    logDebug(
      `qsys deviceId ${deviceId} change volume ${zone}: ${value} by ${req.user.email}`,
      'q-sys',
      'event'
    )
    res.status(200).json({ result: 'OK', device: await QSys.findOne({ deviceId }) })
  } catch (error) {
    logError(`qsys volume change error: ${error}`, 'q-sys', 'event')
    res.status(500).json({ result: false, error })
  }
})

router.put('/mute', async (req, res) => {
  try {
    const { deviceId, zone, value } = req.body
    await QSys.findOneAndUpdate(
      { deviceId, 'ZoneStatus.Zone': zone },
      { 'ZoneStatus.$.mute': value }
    )
    io.emit('qsys:command', JSON.stringify({ deviceId, command: 'changeMute', zone, value }))
    logDebug(
      `qsys deviceId ${deviceId} change mute ${zone}: ${value} by ${req.user.email}`,
      'q-sys',
      'event'
    )
    res.status(200).json({ result: 'OK', device: await QSys.findOne({ deviceId }) })
  } catch (error) {
    logError(`qsys mute change error: ${error}`, 'q-sys', 'event')
    res.status(500).json({ result: false, error })
  }
})

router.put('/modifiedzonename', async (req, res) => {
  try {
    const { deviceId, zone, name } = req.body
    await QSys.findOneAndUpdate(
      { deviceId, 'ZoneStatus.Zone': zone },
      { 'ZoneStatus.$.name': name }
    )
    logDebug(
      `qsys deviceId: ${deviceId} zone name change ${zone}: ${name} by ${req.user.email}`,
      'q-sys',
      'data'
    )
    res.status(200).json({ result: true, devices: await QSys.find() })
  } catch (error) {
    logError(`qsys zone name change error: ${error}`)
  }
})

export default router

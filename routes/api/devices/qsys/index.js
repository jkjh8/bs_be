import express from 'express'
import { sendQsysDevices } from '@/api/qsys/devices'
import { logError, logEvent, logDebug } from '@/api/logger'
import { io } from '@/app'
// db functions
import {
  qsysMake,
  qsysFind,
  qsysUpdate,
  qsysRemovebyId,
  qsysExists
} from '@/db/functions/qsys'
import { qsysCommand } from '@/api/qsys/command'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    res.status(200).json({ result: true, devices: await qsysFind() })
  } catch (error) {
    logError(`QSYS 장치 검색 오류: ${error}`)
    res.status(500).json({ result: false, error })
  }
})

router.post('/', async (req, res) => {
  try {
    await qsysMake({ ...req.body })
    await sendQsysDevices()
    res.status(200).json({ result: true })
    // add event log
    logEvent(
      `QSYS 장치 추가 ${req.body.name}:${req.body.ipaddress}-${req.body.deviceId}`,
      req.user.email,
      'qsys'
    )
  } catch (error) {
    logError(`QSYS 장치 추가 오류: ${error}`)
    res.status(500).json({ result: false, error })
  }
})

router.delete('/', async (req, res) => {
  try {
    const r = await qsysRemovebyId(req.body._id)
    await sendQsysDevices()
    res.status(200).json({ result: true, data: r })
    logEvent(
      `QSYS 장치 제거 ${req.body.name}:${req.body.ipaddress}-${req.body.deviceId}`,
      req.user.email,
      'qsys'
    )
  } catch (error) {
    logError(`QSYS 장치 제거 오류: ${error}`, 'server', 'qsys')
    res.status(500).json({ result: false, error })
  }
})

router.get('/exists', async (req, res) => {
  try {
    res.status(200).json({ result: await qsysExists({ ...req.query.value }) })
  } catch (error) {
    res.status(500).json({ result: false, error })
  }
})

router.put('/volume', async (req, res) => {
  try {
    const { deviceId, zone, value } = req.body
    await qsysUpdate(
      { deviceId, 'ZoneStatus.Zone': zone },
      { 'ZoneStatus.$.gain': value }
    )
    qsysCommand({ deviceId, command: 'changeVol', zone, value })
    res.status(200).json({ result: 'OK', devices: await qsysFind() })
    logDebug(
      `QSYS 장치ID ${deviceId} 볼륨 변경 ${zone}: ${value}, 사용자: ${req.user.email}`,
      'q-sys',
      'event'
    )
  } catch (error) {
    logError(`QSYS 볼륨 변경 오류: ${error}`, 'q-sys', 'event')
    res.status(500).json({ result: false, error })
  }
})

router.put('/mute', async (req, res) => {
  try {
    const { deviceId, zone, value } = req.body
    await qsysUpdate(
      { deviceId, 'ZoneStatus.Zone': zone },
      { 'ZoneStatus.$.mute': value }
    )
    qsysCommand({ deviceId, command: 'changeMute', zone, value })
    res.status(200).json({ result: 'OK', devices: await qsysFind() })
    logDebug(
      `QSYS 장치ID ${deviceId} 뮤트 ${zone}: ${value}, 사용자: ${req.user.email}`,
      'q-sys',
      'event'
    )
  } catch (error) {
    logError(`QSYS 뮤드 오류: ${error}`, 'q-sys', 'event')
    res.status(500).json({ result: false, error })
  }
})

router.put('/modifiedzonename', async (req, res) => {
  try {
    const { deviceId, zone, name } = req.body
    await qsysUpdate(
      { deviceId, 'ZoneStatus.Zone': zone },
      { 'ZoneStatus.$.name': name }
    )
    res.status(200).json({ result: true, devices: await qsysFind() })
    logDebug(
      `QSYS 장치ID: ${deviceId} 방송구간 이름변경 ${zone}: ${name}, 사용자: ${req.user.email}`,
      'q-sys',
      'data'
    )
  } catch (error) {
    logError(`QSYS 방송구간 이름변경 오류: ${error}`)
  }
})

export default router

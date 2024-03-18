import express from 'express'
import { sendQsysDevices } from '@/api/qsys/devices'
import { logError, logEvent, logDebug } from '@/api/logger'
import Qsys from '@/db/models/qsys'
// db functions
import {
  qsysMake,
  qsysFind,
  qsysUpdate,
  qsysFindByIdUpdate,
  qsysRemovebyId,
  qsysExists,
  qsysFindAll
} from '@/db/functions/qsys'
import { qsysCommand } from '@/api/qsys/command'
import {
  fnSendQsysRefreshZoneAll,
  fnSendQsysDevices,
  fnSendQsysZone,
  fnCancelAll
} from '@/api/qsys'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    res.status(200).json({ result: true, devices: await qsysFindAll() })
  } catch (error) {
    logError(`QSYS 장치 검색 오류: ${error}`)
    res.status(500).json({ result: false, error })
  }
})

router.post('/', async (req, res) => {
  try {
    await qsysMake({ ...req.body })
    await sendQsysDevices()
    logDebug(
      `QSYS 장치 추가 ${req.body.name}:${req.body.ipaddress}-${req.body.deviceId}`,
      req.user.email,
      'qsys'
    )
    res.status(200).json({ result: true })
    // add event log
  } catch (error) {
    logError(`QSYS 장치 추가 오류: ${error}`)
    res.status(500).json({ result: false, error })
  }
})

router.delete('/', async (req, res) => {
  try {
    const r = await qsysRemovebyId(req.body._id)
    await sendQsysDevices()
    logDebug(
      `QSYS 장치 제거 ${req.body.name}:${req.body.ipaddress}-${req.body.deviceId}`,
      req.user.email,
      'qsys'
    )
    res.status(200).json({ result: true, data: r })
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
    logError(`QSYS 뮤드 오류: ${error}`, 'qsys', 'event')
    res.status(500).json({ result: false, error })
  }
})

// 방송구간 바릭스 세팅
router.put('/zoneupdate', async (req, res) => {
  try {
    const { id, deviceId, zone, destination, ipaddress } = req.body
    const r = await qsysUpdate(
      { '_id': id, 'ZoneStatus.Zone': zone },
      { 'ZoneStatus.$.destination': destination }
    )

    // set zone
    fnSendQsysZone(deviceId, zone, destination, ipaddress)
    // share data all
    await fnSendQsysDevices()
    res.status(200).json({ result: true, value: r })
  } catch (error) {
    logError(`QSYS 데이터 업데이트 ${error}`, 'qsys', 'event')
    res.status(500).json({ result: false, error })
  }
})

router.get('/existszone', async (req, res) => {
  try {
    const { id } = req.query
    res.status(200).json({
      result: true,
      value: await qsysFind({
        ZoneStatus: { $elemMatch: { destination: id } }
      })
    })
  } catch (error) {
    logError(`QSYS 방송 지역 검색 ${error}`)
    res.status(500).json({ status: false, error })
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
    res.status(500).json({ result: false, error })
  }
})

router.get('/cancal', async (req, res) => {
  try {
    fnCancelAll(req.query.deviceId)
    res.status(200).json({ result: true })
  } catch (error) {
    logError(`Q-SYS 방송 강제 취소 오류 ${error}`, 'qsys', 'event')
    res.status(500).json({ result: false, error })
  }
})

router.get('/refreshall', async (req, res) => {
  try {
    fnSendQsysRefreshZoneAll(req.query.deviceId)
    res.status(200).json({ result: true })
  } catch (error) {
    res.status(500).json({ result: false, error })
  }
})

export default router

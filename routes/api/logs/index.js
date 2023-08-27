import express from 'express'
import Hangul from 'hangul-js'
import Logs from '@/db/models/logs'
import Eventlog from '@/db/models/eventlog'
import { isloggedin } from '@/api/user/isLoggedin'

const router = express.Router()

router.get('/', isloggedin, async (req, res, next) => {
  try {
    const { limit, page, search } = req.query
    const searchOptions = []
    if (search) {
      searchOptions.push({
        search: new RegExp(Hangul.disassembleToString(search), 'i')
      })
    }
    // get count
    const count = await Logs.countDocuments(
      searchOptions.length ? { $and: searchOptions } : {}
    )
    // get docs
    const current = await Logs.find(
      searchOptions.length ? { $and: searchOptions } : {}
    )
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec()
    // return
    res.status(200).json({ result: true, count, current, limit, page })
  } catch (error) {
    logger.error(`get logs error ${error}`)
    res.status(500).json({ result: false, error })
  }
})

router.get('/eventlog', isloggedin, async (req, res, next) => {
  try {
    const { limit, page, search } = req.query
    const searchOptions = []
    if (search) {
      searchOptions.push({
        search: new RegExp(Hangul.disassembleToString(search), 'i')
      })
    }
    // get count
    const count = await Eventlog.countDocuments(
      searchOptions.length ? { $and: searchOptions } : {}
    )
    // get docs
    const current = await Eventlog.find(
      searchOptions.length ? { $and: searchOptions } : {}
    )
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec()
    // return
    res.status(200).json({ result: true, count, current, limit, page })
  } catch (error) {
    logger.error(`get eventlog error ${error}`)
    res.status(500).json({ result: false, error })
  }
})

export default router

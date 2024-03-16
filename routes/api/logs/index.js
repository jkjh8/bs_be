import express from 'express'
import Hangul from 'hangul-js'
import Logs from '@/db/models/logs'
import { isloggedin } from '@/api/user/isLoggedin'
import { logInfo, logError, logDebug } from '@/api/logger'

const router = express.Router()

router.get('/', isloggedin, async (req, res, next) => {
  try {
    console.log(req.query)
    let sort = {}
    const { pagination, filter, level } = JSON.parse(req.query.options)
    const { rowsPerPage, page, sortBy, descending } = pagination
    sort[sortBy] = descending ? -1 : 1

    const searchOptions = []
    if (level && level !== 0) {
      searchOptions.push({ levelNum: { $gt: level } })
    }
    if (filter) {
      searchOptions.push({
        search: new RegExp(Hangul.disassembleToString(filter), 'i')
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
      .limit(rowsPerPage)
      .skip((page - 1) * rowsPerPage)
      .sort({ ...sort })
    // return
    res.status(200).json({
      result: true,
      current,
      pagination: {
        ...pagination,
        rowsNumber: count
      }
    })
  } catch (error) {
    logError(`로그 데이터 가져오기 실패: ${error}`, 'server', 'log')
    res.status(500).json({ result: false, error })
  }
})

export default router

import express from 'express'
import path from 'node:path'
import fs from 'node:fs'
import { isAdmin } from '../../../api/user/isLoggedin'
import upload from './uploader'

import {
  chkMakeFolder,
  getFolders,
  getFiles,
  getFolderSize,
  remveFileFolder,
  deleteTempFolder
} from '@/api/files'
import { logInfo, logError, logDebug } from '@/api/logger'
import ziper from './zip'

const router = express.Router()

router.get('/', (req, res) => {
  try {
    const { folder } = req.query
    res.status(200).json({ files: getFiles(folder) })
  } catch (error) {
    logError(`파일 검색 오류: ${error}`, 'server', 'files')
    res.status(500).json({ result: false, error })
  }
})

router.post('/', upload.any(), (req, res) => {
  try {
    res.status(200).json({
      result: 'OK'
    })
  } catch (error) {
    logError(`파일 업로드 오류: ${error}`, 'server', 'files')
    res.status(500).json({ result: false, error })
  }
})

// folders
router.get('/dir', (req, res) => {
  try {
    const { email } = req.user
    res.status(200).json(getFolders(email))
  } catch (error) {
    logError(`폴더 검색 오류 : ${error}`, 'server', 'files')
  }
})

router.post('/newfolder', (req, res) => {
  try {
    const newFolder = path.join(req.body.folder, req.body.name)
    chkMakeFolder(newFolder)
    logInfo(
      `새폴더: ${newFolder.replace(mediaPath.media, '')}, 사용자:${
        req.user.email
      }`,
      'server',
      'files'
    )
    res.status(200).json({ result: 'OK' })
  } catch (error) {
    logError(`새폴더 오류: ${error}`, 'server', 'files')
    res.status(500).json({ result: false, error })
  }
})

router.delete('/', (req, res) => {
  try {
    const { files } = req.body
    remveFileFolder(files)
    logInfo(
      `파일(폴더) 삭제: ${files.map((item) => item.base)}, 사용자: ${
        req.user.email
      }`,
      'server',
      'files'
    )
    res.status(200).json({ result: 'OK' })
  } catch (error) {
    logError(`파일(폴더) 삭제 오류: ${error}`, 'server', 'files')
    res.status(500).json({ result: false, error })
  }
})

router.delete('/temp', isAdmin, (req, res) => {
  try {
    deleteTempFolder()
    logInfo(`임시 폴더 비우기, 사용자: ${req.user.email}`, 'server', 'files')
    res.status(200).json({ result: 'OK' })
  } catch (error) {
    logError(`임시 폴더 비우기 오류: ${error}`, 'server', 'files')
    res.status(500).json({ result: false, error })
  }
})

router.get('/download', async (req, res) => {
  try {
    res.download(await ziper(JSON.parse(req.query.files)))
  } catch (error) {
    logError(`파일 다운로드 오류: ${error}`)
    res.status(500).json({ result: false, error })
  }
})

router.put('/rename', (req, res) => {
  try {
    const { oldName, newName } = req.body
    fs.renameSync(oldName, newName)
    logInfo(
      `파일(폴더) 이름 변경: ${oldName} to ${newName}, 사용자: ${req.user.email}`,
      'server',
      'files'
    )
    res.status(200).json({ result: 'OK' })
  } catch (error) {
    logError(`파일(폴더) 이름 변경 실패, 사용자: ${req.user.email} ${error}`)
    res.status(500).json({ result: false, error })
  }
})

router.get('/size', (req, res) => {
  try {
    const { fullpath } = req.query
    let size = 0
    if (fullpath === 'temp') {
      size = getFolderSize(mediaPath.temp)
    } else {
      size = getFolderSize(fullpath)
    }
    res.status(200).json({ size })
  } catch (error) {
    logError(`파일(폴더) 크기 확인 오류: ${fullpath}`, 'server', 'files')
    res.status(500).json({ result: false, error })
  }
})

export default router

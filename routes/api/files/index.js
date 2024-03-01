import express from 'express'
import path from 'node:path'
import fs from 'node:fs'
import { isAdmin } from '../../../api/user/isLoggedin'
import upload from './uploader'

import { chkMakeFolder, getFolders, getFiles, getFolderSize } from '@/api/files'
import { logInfo, logError, logDebug } from '@/api/logger'
import ziper from './zip'

const router = express.Router()

router.get('/', (req, res) => {
  try {
    const { folder } = req.query
    res.status(200).json({ files: getFiles(folder) })
  } catch (error) {
    logError(`get media files error: ${error}`, 'server', 'files')
    res.status(500).json({ result: false, error })
  }
})

router.post('/', upload.any(), (req, res) => {
  try {
    res.status(200).json({
      result: 'OK'
    })
  } catch (error) {
    logError(`file upload error: ${error}`, 'server', 'files')
    res.status(500).json({ result: false, error })
  }
})

// folders
router.get('/dir', (req, res) => {
  try {
    const { email } = req.user
    res.status(200).json(getFolders(email))
  } catch (error) {
    logError(`file get dir error: ${error}`, 'server', 'files')
  }
})

router.post('/newfolder', (req, res) => {
  try {
    const { folder, name } = req.body
    chkMakeFolder(path.resolve(folder, name))
    logInfo(`make new folder ${name} by ${req.user.email}`, 'server', 'files')
    res.status(200).json({ result: 'OK' })
  } catch (error) {
    logError(`make new folder error: ${error}`, 'server', 'files')
    res.status(500).json({ result: false, error })
  }
})

router.delete('/', (req, res) => {
  try {
    const { files } = req.body
    for (let file of files) {
      if (fs.existsSync(file.fullpath)) {
        if (file.type === 'folder') {
          fs.rmdirSync(file.fullpath, { recursive: true })
        } else {
          fs.unlinkSync(file.fullpath)
        }
      }
    }
    logInfo(
      `removed file or folder path: ${files.map((item) => item.base)} by ${
        req.user.email
      }`,
      'server',
      'files'
    )
    res.status(200).json({ result: 'OK' })
  } catch (error) {
    logError(`remove folder or file error ${error}`, 'server', 'files')
    res.status(500).json({ result: false, error })
  }
})

router.delete('/temp', isAdmin, (req, res) => {
  try {
    const files = fs.readdirSync(tempFolder)
    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(tempFolder, files[i])
      const stats = fs.statSync(filePath)
      if (stats.isDirectory()) {
        fs.rmdirSync(filePath, { recursive: true })
      } else {
        fs.unlinkSync(filePath)
      }
    }
    logInfo(`removed temp folder by ${req.user.email}`, 'server', 'files')
    res.status(200).json({ result: 'OK' })
  } catch (error) {
    logError(`remove temp foler error ${error}`, 'server', 'files')
    res.status(500).json({ result: false, error })
  }
})

router.get('/download', async (req, res) => {
  try {
    res.download(await ziper(JSON.parse(req.query.files)))
  } catch (error) {
    logError(`file download error: ${error}`)
    res.status(500).json({ result: false, error })
  }
})

router.put('/rename', (req, res) => {
  try {
    const { oldName, newName } = req.body
    fs.renameSync(oldName, newName)
    logInfo(
      `file or folder renamed ${oldName} to ${newName} by ${req.user.email}`,
      'server',
      'files'
    )
    res.status(200).json({ result: 'OK' })
  } catch (error) {
    logError(`rename file or folder failed by ${req.user.email} ${error}`)
    res.status(500).json({ result: false, error })
  }
})

router.get('/size', (req, res) => {
  try {
    const { fullpath } = req.query
    if (fullpath === 'temp') {
      return res
        .status(200)
        .json({ result: true, size: getFolderSize(tempFolder) })
    }
    if (fs.existsSync(fullpath)) {
      return res
        .status(200)
        .json({ result: true, size: getFolderSize(fullpath) })
    }
    res
      .status(200)
      .json({ result: false, size: 0, message: 'file or folder not exists' })
  } catch (error) {
    logError(`file or Folder check size error ${fullpath}`, 'server', 'files')
    res.status(500).json({ result: false, error })
  }
})

export default router

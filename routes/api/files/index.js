import express from 'express'
import path from 'node:path'
import fs from 'node:fs'
import multer from 'multer'
import { getDirs, chkFolder } from '@/api/files'
import { logInfo, logError, logDebug } from '@/api/logger'

const router = express.Router()

const mediaPath = path.resolve(__dirname, '../../../media')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { folders } = req.headers
    cb(null, path.resolve(mediaPath, folders))
  },
  filename: (req, file, cb) => {
    logInfo(
      `file uploaded successfully name: ${file.fieldname.toString('utf8')}`,
      'server',
      'files'
    )
    cb(null, file.fieldname.toString('utf8'))
  }
})

const upload = multer({ storage: storage })

router.get('/', (req, res) => {
  try {
    const currentFolder = path.resolve(mediaPath, req.query.folders)
    const currentFiles = fs.readdirSync(currentFolder)
    let filesWithData = []
    for (let i = 0; i < currentFiles.length; i++) {
      let file = currentFiles[i]
      let fileFullPath = path.resolve(currentFolder, file)
      let parse = path.parse(fileFullPath)
      let stat = fs.statSync(fileFullPath)
      filesWithData.push({
        fileFullPath,
        ...parse,
        type: stat.isDirectory() ? 'folder' : parse.ext.replace('.', ''),
        size: stat.size
      })
    }
    res.status(200).json({ files: filesWithData })
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
    const {email} = req.user
    const globalFolder = path.resolve(mediaPath, 'global')
    const globalFolders = getDirs(globalFolder)
    const userFolder = path.resolve(mediaPath, email)
    chkFolder(userFolder)
    const userFolders = getDirs(userFolder)
    res.status(200).json([{
      label: '공용폴더',
      path: globalFolder,
      children: globalFolders}, {
        label: '사용자폴더',
        path: userFolder ?? '',
        children: userFolders ?? []
      }])
  } catch (error) {
    logError(`file get dir error: ${error}`, 'server', 'files')
  }

})

router.post('/newfolder', (req, res) => {
  try {
    const { folders, name } = req.body
    const newFolder = path.resolve(mediaPath, folders ? folders : '', name)
    if (!fs.existsSync(newFolder)) {
      fs.mkdirSync(newFolder)
    }
    logInfo(`make new folder ${name} by ${req.user.email}`, 'server', 'files')
    res.status(200).json({ result: 'OK' })
  } catch (error) {
    logError(`make new folder error: ${error}`, 'server', 'files')
    res.status(500).json({ result: false, error })
  }
})

router.delete('/remove', (req, res) => {
  try {
    const { fileFullPath } = req.body
    if (fs.existsSync(fileFullPath)) {
      fs.rmSync(fileFullPath, { recursive: true })
      logInfo(
        `removed file or folder path: ${fileFullPath} by ${req.user.email}`,
        'server',
        'files'
      )
    }
    res.status(200).json({ result: 'OK' })
  } catch (error) {
    logError(`remove folder or file error ${error}`, 'server', 'files')
    res.status(500).json({ result: false, error })
  }
})

router.get('/download/:file', (req, res) => {
  try {
    const file = JSON.parse(req.params.file)
    res.download(file.fileFullPath, `${file.base}`)
    logDebug(`Download file ${file.base} to ${req.user.email}`, 'server', 'files')
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

export default router

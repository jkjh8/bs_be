import express from 'express'
import path from 'node:path'
import fs from 'node:fs'
import { logInfo, logError } from '@/api/logger'
const router = express.Router()

const mediaPath = path.resolve(__dirname, '../../../media')

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
    logError(`get media files error: ${error}`)
    res.status(500).json({ error })
  }
})

router.post('/newfolder', (req, res) => {
  try {
    const { folders, name } = req.body
    const newFolder = path.resolve(mediaPath, folders ? folders : '', name)
    if (!fs.existsSync(newFolder)) {
      fs.mkdirSync(newFolder)
    }
    res.status(200).json({ result: 'OK' })
  } catch (error) {
    logError(`make new folder error: ${error}`)
    res.status(500).json({ error })
  }
})
export default router

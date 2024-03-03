import multer from 'multer'
import { logInfo, logError, logDebug } from '@/api/logger'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { folder } = req.headers
    cb(null, decodeURIComponent(folder))
  },
  filename: (req, file, cb) => {
    logInfo(
      `파일 업로드: ${file.fieldname.toString('utf8')}`,
      'server',
      'files'
    )
    cb(null, file.fieldname.toString('utf8'))
  }
})

const upload = multer({ storage: storage })

export default upload

import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { folder } = req.headers
    cb(null, decodeURIComponent(folder))
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

export default upload

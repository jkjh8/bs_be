import fs from 'fs'
import path from 'path'
import archiver from 'archiver'
import hash from '@/api/uniqueId'
import { fnCheckMakeFolder } from '@/api/files'

const tempFolder = path.join(__dirname, '../../../media', 'temp')

export default async function (files) {
  // check and made temp folder
  fnCheckMakeFolder(tempFolder)
  return new Promise((resolve, reject) => {
    const filename = `${hash(8)}.zip`
    const output = fs.createWriteStream(tempFolder + '/' + filename)

    const archive = archiver('zip', { zlib: { level: 9 } })

    output.on('close', () => {
      console.log(archive.pointer() + 'total bytes')
      resolve(tempFolder + '/' + filename)
    })

    output.on('end', () => {
      console.log('file stream end')
    })

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.log(err.code)
      } else {
        reject(err)
      }
    })

    archive.on('error', (err) => {
      reject(err)
    })

    archive.pipe(output)

    for (let file of files) {
      if (file.type === 'file') {
        archive.append(fs.createReadStream(file.fullpath, { flage: 'r' }), {
          name: file.base
        })
      }
      if (file.type === 'folder') {
        archive.directory(file.fullpath, file.name)
      }
    }

    archive.finalize()
  })
}

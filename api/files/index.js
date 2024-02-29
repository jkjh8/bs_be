import fs from 'fs'
import path from 'path'

const getDirs = (dir) =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file)
    const isDirectory = fs.statSync(name).isDirectory()
    if (isDirectory) {
      return [...files, { label: file, path: name, children: getDirs(name) }]
    }
    return files
  }, [])

const chkFolder = (folder) => {
  console.log('chk foler = ' + folder)
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true })
    console.log('make foler')
  }
}

export { getDirs, chkFolder }

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

const chkMakeFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true })
  }
}

function getFolders(email) {
  const globalFolders = getDirs(mediaPath.global)
  const userFolder = path.join(mediaPath.media, email)
  chkMakeFolder(userFolder)
  const userFolders = getDirs(userFolder)
  return {
    folders: [
      {
        label: '공용폴더',
        path: mediaPath.global,
        root: true,
        children: globalFolders
      },
      {
        label: '사용자폴더',
        path: userFolder,
        root: true,
        children: userFolders
      }
    ],
    globalFolder: mediaPath.global,
    userFolder
  }
}

function getFiles(folder) {
  const files = fs.readdirSync(folder)
  const filesWithData = []
  for (let i = 0; i < files.length; i++) {
    const fullpath = path.join(folder, files[i])
    const stat = fs.statSync(fullpath)
    filesWithData.push({
      fullpath,
      path: fullpath.replace(mediaPath.media, ''),
      type: stat.isDirectory() ? 'folder' : 'file',
      ...stat,
      ...path.parse(fullpath)
    })
  }
  return filesWithData
}

function getFolderSize(folder) {
  let size = 0
  const files = fs.readdirSync(folder)
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(folder, files[i])
    const stats = fs.statSync(filePath)
    if (stats.isFile()) {
      size += stats.size
    } else if (stats.isDirectory()) {
      size += getFolderSize(filePath)
    }
  }
  return size
}

function deleteTempFolder() {
  const files = fs.readdirSync(mediaPath.temp)
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(mediaPath.temp, files[i])
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      fs.rmdirSync(filePath, { recursive: true })
    } else {
      fs.unlinkSync(filePath)
    }
  }
}

export {
  getDirs,
  chkMakeFolder,
  getFolders,
  getFiles,
  getFolderSize,
  deleteTempFolder
}

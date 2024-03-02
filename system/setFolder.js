import path from 'node:path'
import { chkMakeFolder } from '../api/files'

export default function () {
  const defaultF = path.resolve(__dirname, '..')
  const mediaF = path.join(defaultF, 'media')
  const globalF = path.join(mediaF, 'global')
  const tempF = path.join(mediaF, 'temp')
  chkMakeFolder(mediaF)
  chkMakeFolder(globalF)
  chkMakeFolder(tempF)

  global.mediaPath = {
    default: defaultF,
    media: mediaF,
    global: globalF,
    temp: tempF
  }
}

import path from 'node:path'
import express from 'express'
import { fnCheckMakeFolder } from '../api/files'
import setup from '../db/models/setup'
import { logError } from '../api/logger'

export default async function (defaultFolder, app) {
  setup
    .findOne({ key: 'mediaFolder ' })
    .then((doc) => {
      let defaultF
      if (doc && doc.value) {
        defaultF = doc.value
      } else {
        defaultF = defaultFolder
      }
      const mediaF = path.join(defaultF, 'media')
      const globalF = path.join(mediaF, 'global')
      const tempF = path.join(mediaF, 'temp')
      fnCheckMakeFolder(mediaF)
      fnCheckMakeFolder(globalF)
      fnCheckMakeFolder(tempF)

      global.mediaPath = {
        default: defaultF,
        media: mediaF,
        global: globalF,
        temp: tempF
      }
      // 미디어 폴더 외부 공유 개시
      app.use('/media', express.static(mediaPath.media))
    })
    .catch((err) => {
      logError(`미디어 폴더 생성 오류: ${err}`, 'server', 'folder')
    })
}

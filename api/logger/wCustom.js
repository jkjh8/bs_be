import Transport from 'winston-transport'
import Logs from '@/db/models/logs'

export default class CustomMongo extends Transport {
  constructor(opts) {
    super(opts)
  }

  log(info, callback) {
    setImmediate(async () => {
      const newLog = new Logs({
        level: info.level,
        levelNum: info.levelNum,
        message: info.message
      })
      if (info.source) newLog.source = info.source
      if (info.category) newLog.category = info.category

      await newLog.save()
      this.emit('logged', info)
    })
    callback()
  }
}

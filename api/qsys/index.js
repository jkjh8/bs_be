import Device from '@/db/models/device'
async function qsysDataParser(obj) {
  let r
  const { deviceId, key, data } = obj
  switch (key) {
    case 'status':
      r = await Device.updateOne({ deviceId }, { status: data })
      break
    case 'zones':
      const curr = await Device.findOne({ deviceId })
      console.log('curr', curr)

      if (curr && curr.zones) {
        let zones = { ...curr.zones }
        for (let objkey in data) {
          console.log(objkey, data[objkey])
          if (zones[objkey]) {
            zones[objkey] = { ...zones[objkey], ...data[objkey] }
          }
        }
        console.log('get zones')
        r = await Device.updateOne({ deviceId }, { zones })
      } else {
        console.log('not zones')
        r = await Device.updateOne({ deviceId }, { zones: data })
      }

      break
    case 'ZoneStatusConfigure':
      r = await Device.updateOne({ deviceId }, { ZoneStatusConfigure: data })
      break
    case 'gainAndMute':
      r = await Device.updateOne(
        { deviceId },
        { gain: obj.gain, mute: obj.mute }
      )
    case 'PaConfig':
      r = await Device.updateOne({ deviceId }, { PaConfig: data })
      break
  }
}

export { qsysDataParser }

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
      let zones = { ...curr.zones }

      if (curr && curr.zones) {
        console.log('get zones')
      } else {
        console.log('not zones')
      }

      r = await Device.updateOne({ deviceId }, { zones: data })
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

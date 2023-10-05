import Device from '@/db/models/device'
async function qsysDataParser(obj) {
  let r
  const { deviceId, key, data } = obj
  switch (key) {
    case 'status':
      r = await Device.updateOne({ deviceId }, { status: data })
      console.log(r)
      break
    case 'zones':
      r = await Device.updateOne({ deviceId }, { zones: data })
      console.log(r)
      break
    case 'ZoneStatusConfigure':
      r = await Device.updateOne({ deviceId }, { ZoneStatusConfigure: data })
      console.log(r)
      break
    case 'gainAndMute':
      r = await Device.updateOne(
        { deviceId },
        { gain: obj.gain, mute: obj.mute }
      )
    case 'PaConfig':
      console.log(data)
      break
  }
}

export { qsysDataParser }

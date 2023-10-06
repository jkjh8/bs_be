import Device from '@/db/models/device'
async function qsysDataParser(obj) {
  console.log(obj)
  const { deviceId, key, data } = obj
  let curr
  let r
  switch (key) {
    case 'status':
      r = await Device.updateOne({ deviceId }, { status: data })
      break
    case 'zones':
      // find current data
      curr = await Device.findOne({ deviceId })
      // update data
      if (curr && curr.zones) {
        let zones = { ...curr.zones }
        for (let objkey in data) {
          if (zones[objkey]) {
            zones[objkey] = { ...zones[objkey], ...data[objkey] }
          } else {
            zones[objkey] = data[objkey]
          }
          // update db
        }
        r = await Device.updateOne({ deviceId }, { zones: zones })
      } else {
        // not exist current data
        r = await Device.updateOne({ deviceId }, { zones: data })
      }

      break
    case 'ZoneStatusConfigure':
      r = await Device.updateOne({ deviceId }, { ZoneStatusConfigure: data })
      break
    case 'gainAndMute':
      curr = await Device.findOne({ deviceId })
      if (curr && curr.zones) {
        let zones = { ...curr.zones }
        for (let objkey in data) {
          zones[objkey] = { ...zones[objkey], ...data.gain[objkey] }
        }
        console.log('gain')
        r = await Device.updateOne({ deviceId }, { zones })
      }
    case 'PaConfig':
      r = await Device.updateOne({ deviceId }, { PaConfig: data })
      break
  }
}

export { qsysDataParser }

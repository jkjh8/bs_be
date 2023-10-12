import Bridge from '@/db/models/bridge'
import Device from '@/db/models/device'

export default async function bridgeParser(args, socket) {
  console.log(args)
  switch (args.key) {
    case 'getDevices':
      socket.emit(
        `${args.type}:data`,
        JSON.stringify({
          key: 'devices',
          value: await Device.find({ 'deviceType.deviceType': 'Q-SYS' })
        })
      )
      break
  }
}

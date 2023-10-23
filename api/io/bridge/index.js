import Bridge from '@/db/models/bridge'
import QSys from '@/db/models/qsys'

export default async function bridgeParser(args, socket) {
  console.log(args)
  switch (args.key) {
    case 'getDevices':
      socket.emit(
        `${args.type}:data`,
        JSON.stringify({
          key: 'devices',
          value: await QSys.find({})
        })
      )
      break
  }
}

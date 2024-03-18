import { clients } from '..'
import { bridge } from '@/io/bridge'

export default async function parser(socket) {
  socket.on('qsys:volume', (args) => {
    bridge.emit('qsys:volume', args)
  })

  socket.on('qsys:mute', (args) => {
    bridge.emit('qsys:mute', args)
  })
}

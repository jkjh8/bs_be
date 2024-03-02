import net from 'net'
import { logInfo, logWarn, logError, logDebug } from '@/api/logger'
import tcpCommands from './functions'

let tcpServer
const sockets = []

function connectTcpServer(port) {
  tcpServer = net.createServer((socket) => {
    socket.setEncoding('utf8')

    sockets.push(socket)
    socket.on('close', () => {
      logWarn(
        `TCP Socket disconnected - ${socket.remoteAddress}, ${socket.remotePort}`,
        'server',
        'hardware'
      )
      for (let i = 0; i < sockets.length; i++) {
        if (sockets[i] === socket) {
          sockets.splice(i, 1)
        }
      }
    })
    socket.on('data', (data) => {
      console.log(`TCP Server data on - ${data}`)
      // for tcp commands
      tcpCommands(data)
      //
    })
    socket.on('error', (error) => {
      logError(`TCP Server error - ${error}`)
    })
    logInfo(
      `Tcp Socket connected - ${socket.remoteAddress}, ${socket.remotePort}`
    )
  })

  tcpServer.listen(port, '127.0.0.1', () => {
    logInfo(`TCP Server listening on ${port}`, 'server', 'hardware')
  })
}

function writeTcpSockets(data) {
  for (let socket of sockets) {
    socket.write(JSON.stringify(data))
  }
}

export { connectTcpServer, tcpServer, writeTcpSockets }

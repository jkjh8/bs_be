import { io } from '@/app'

const qsysCommand = (args) => {
  return io.emit('qsys:command', JSON.stringify({ ...args }))
}

export { qsysCommand }

import mongoose from 'mongoose'

const bridgeSchema = new mongoose.Schema(
  {
    type: String,
    id: String,
    socket: String,
    reason: String,
    connected: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Bridge', bridgeSchema)

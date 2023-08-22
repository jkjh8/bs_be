import mongoose from 'mongoose'

const bridgeSchema = new mongoose.Schema(
  {
    type: String,
    id: String
  },
  {
    timestamps: true
  }
)

export default mongoose.model('bridge', bridgeSchema)

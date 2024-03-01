import mongoose from 'mongoose'

const setupSchema = new mongoose.Schema(
  {
    type: String,
    key: String,
    ipaddress: String,
    port: Number,
    value: String
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Setup', setupSchema)

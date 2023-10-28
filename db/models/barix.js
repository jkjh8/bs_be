import mongoose from 'mongoose'

const barixSchema = new mongoose.Schema(
  {
    name: String,
    deviceId: { type: String, unique: true },
    ipaddress: { type: String, unique: true }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Barix', barixSchema)

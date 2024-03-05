import mongoose from 'mongoose'
const barixSchema = new mongoose.Schema(
  {
    name: String,
    idx: Number,
    deviceId: { type: String, unique: true },
    ipaddress: { type: String, unique: true }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Barix', barixSchema)

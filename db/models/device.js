import mongoose from 'mongoose'

const deviceSchema = new mongoose.Schema(
  {
    name: String,
    deviceId: { type: String, unique: true },
    ipaddress: { type: String, unique: true },
    port: { type: Number, default: 4444 },
    username: { type: String, default: 'admin' },
    password: { type: String, default: 'password' },
    token: String,
    deviceType: {
      deviceType: String,
      model: String
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('device', deviceSchema)

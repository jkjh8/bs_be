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
    connected: { type: Boolean, default: false },
    deviceType: {
      deviceType: String,
      model: String
    },
    gain: Object,
    mute: Object,
    status: Object,
    zones: Object,
    PaConfig: Object,
    ZoneStatusConfigure: Boolean
  },
  {
    timestamps: true
  }
)

export default mongoose.model('device', deviceSchema)

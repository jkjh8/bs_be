import mongoose from 'mongoose'

const deviceSchema = new mongoose.Schema(
  {
    name: String,
    deviceId: { type: String, unique: true },
    ipaddress: { type: String, unique: true },
    port: { type: Number, default: 4444 },
    deviceType: {
      type: String,
      model: String
    },
    numberOfChannels: Number,
    channels: [
      {
        channel: Number,
        name: String,
        destination: String,
        port: Number,
        channelType: String
      }
    ]
  },
  {
    timestamps: true
  }
)

export default mongoose.model('device', deviceSchema)

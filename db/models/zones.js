import mongoose from 'mongoose'

const zonesSchema = new mongoose.Schema({
  name: String,
  zoneId: { type: String, unique: true },
  zoneType: { type: String, default: 'Q-SYS' },
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'device' },
  numberOfChannels: { type: Number, default: 16 },
  channels: [
    {
      channel: Number,
      encoder: { type: mongoose.Schema.Types.ObjectId, ref: 'device' },
      decoder: { type: mongoose.Schema.Types.ObjectId, ref: 'device' }
    }
  ]
})

export default mongoose.model('zone', zonesSchema)

import mongoose from 'mongoose'

const qsysSchema = new mongoose.Schema(
  {
    name: String,
    index: Number,
    deviceId: { type: String, unique: true },
    ipaddress: { type: String, unique: true },
    connected: { type: Boolean, default: false },
    EngineStatus: Object,
    ZoneStatus: [
      {
        Active: Boolean,
        Message: String,
        Priority: Number,
        PriorityName: String,
        Squelch: Boolean,
        Station: Number,
        Zone: Number,
        gain: Number,
        mute: Number,
        name: String,
        destination: mongoose.Types.ObjectId
      }
    ],
    PageStatus: Object,
    PaConfig: Object,
    PageID: Number,
    ZoneStatusConfigure: Boolean
  },
  {
    timestamps: true
  }
)

export default mongoose.model('QSys', qsysSchema)

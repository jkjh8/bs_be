import mongoose from 'mongoose'

const qsysSchema = new mongoose.Schema(
  {
    name: String,
    idx: { type: Number, default: 0 },
    deviceId: { type: String, unique: true },
    ipaddress: { type: String, unique: true },
    connected: { type: Boolean, default: false },
    EngineStatus: Object,
    ZoneStatus: [
      {
        Active: { type: Boolean, default: false },
        Message: String,
        Priority: Number,
        PriorityName: String,
        Squelch: Boolean,
        Station: Number,
        Zone: Number,
        gain: Number,
        mute: Number,
        name: String,
        destination: {
          type: mongoose.Types.ObjectId,
          ref: 'Barix'
        }
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

import mongoose from 'mongoose'

const qsysSchema = new mongoose.Schema(
  {
    name: String,
    idx: { type: Number, default: 0 },
    deviceId: { type: String, unique: true },
    ipaddress: { type: String, unique: true },
    connected: { type: Boolean, default: false },
    header: { type: String, default: 'root' },
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
    PageStatus: [
      {
        State: String,
        Message: String,
        SubState: String,
        PageID: Number
      }
    ],
    PaConfig: Object,
    ZoneStatusConfigure: Boolean
  },
  {
    timestamps: true
  }
)

export default mongoose.model('QSys', qsysSchema)

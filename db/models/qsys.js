import mongoose from 'mongoose'

const qsysSchema = new mongoose.Schema(
  {
    name: String,
    deviceId: { type: String, unique: true },
    ipaddress: { type: String, unique: true },
    connected: { type: Boolean, default: false },
    EngineStatus: Object,
    ZoneStatus: Object,
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

import mongoose from 'mongoose'
import Inc from 'mongoose-sequence'

const AutoIncrement = Inc(mongoose)

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

barixSchema.plugin(AutoIncrement, {
  id: 'barix_idx',
  inc_field: 'idx'
})

export default mongoose.model('Barix', barixSchema)

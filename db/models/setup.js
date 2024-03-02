import mongoose from 'mongoose'

const setupSchema = new mongoose.Schema(
  {
    key: String,
    value: String,
    valueNum: Number,
    valueBoolean: Boolean
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Setup', setupSchema)

/** @format */

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    userPassword: { type: String, bcrypt: true },
    level: { type: Number, default: 0 },
    zones: { type: Array },
    numberOfLogins: { type: Number, default: 0 },
    loginAt: { type: Date, default: new Date() }
  },
  {
    timestamps: true
  }
)

userSchema.plugin(require('mongoose-bcrypt'), { rounds: 10 })
export default mongoose.model('User', userSchema)

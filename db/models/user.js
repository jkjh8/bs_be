/** @format */

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    userPassword: { type: String, bcrypt: true },
    isAdmin: { type: Boolean, default: false },
    level: { type: Number, default: 0 },
    zones: { type: Array },
    numberOfLogins: { type: Number, default: 0 },
    loginAt: { type: Date, default: new Date() },
    folder: { type: String }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('User', userSchema)

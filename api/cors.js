/** @format */

export const corsOptions = {
  origin: (origin, cb) => {
    cb(null, origin)
  },
  credentials: true
}

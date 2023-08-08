/** @format */

module.exports = {
  corsOptions: {
    origin: (origin, cb) => {
      cb(null, origin)
    },
    credentials: true
  }
}

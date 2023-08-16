export const isloggedin = (req, res, next) => {
  if (req.user) {
    return next()
  }
  res.status(403).json({ result: false, user: null, message: 'Please login' })
}

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next()
  }
  res
    .status(403)
    .json({ result: false, user: null, message: 'not have permission' })
}

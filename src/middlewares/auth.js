const jwt = require('jsonwebtoken')
const helpers = require('../helpers/')

module.exports = (req, res, next) => {
  if (!req.headers.authorization) return helpers.response(res, 400, null, 'No token provided', true)
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
    if (err) {
      if (err.name === 'JsonWebTokenError') {
        return helpers.response(res, 401, null, 'Token invalid', true)
      } else if (err.name === 'TokenExpiredError') {
        return helpers.response(res, 401, null, 'Token expired', true)
      } else {
        return helpers.response(res, 401, null, err, true)
      }
    }
    req.userId = decoded.data
    next()
  })
}
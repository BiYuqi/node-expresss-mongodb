const jwt = require('jsonwebtoken')
const CONFIG = require('../config/config')

module.exports = (req, res, next) => {
  let path = req.path
  // jump check
  if (path === '/system/login') {
    return next()
  }
  const token = req.headers.authorization
  if (!token) {
    return res.send({
      code: 401,
      data: '登录信息已经失效，请重新登录'
    })
  }
  jwt.verify(token, CONFIG.user_token_name, (err, decoded) => {
    if (err) {
      return res.send({
        code: 401,
        data: '登录信息已经失效，请重新登录'
      })
    } else {
      req.user = decoded
      return next()
    }
  })
}

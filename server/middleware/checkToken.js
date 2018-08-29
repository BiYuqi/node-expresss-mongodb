const jwt = require('jsonwebtoken')
const CONFIG = require('../config/config')
const checkPath = require('../common/serverFilters')
module.exports = (req, res, next) => {
  let path = req.path
  // 跳过token验证
  if (checkPath(path)) {
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

const jwt = require('jsonwebtoken')
const User = require('../models/users')
const CONFIG = require('../config/config')
module.exports = {
  login: (req, res) => {
    const {username, password} = req.body
    User.find({}).then((user) => {
      if (user && user.length > 0) {
        for (let i = 0; i < user.length; i++) {
          if (user[i].username === username) {
            if (user[i].password === password) {
              req.session.sessionID = username
              const info = Object.assign({}, user[i], {loginAt: +new Date()})
              const token = jwt.sign(info, CONFIG.user_token_name, {expiresIn: '1h'})
              return res.send({
                code: 200,
                message: '登录成功',
                data: {
                  token
                }
              })
            } else {
              return res.send({
                code: 10006,
                message: '用户密码错误',
                data: null
              })
            }
          } else {
            return res.send({
              code: 10000,
              message: '用户不存在, 请注册',
              data: null
            })
          }
        }
      } else {
        return res.send({
          code: 10000,
          message: '用户不存在, 请注册',
          data: null
        })
      }
    })
  },
  register: (req, res) => {
    User.create(req.body, (err, user) => {
      if (err) {
        return res.send({
          code: 500,
          message: '用户创建失败',
          data: err.errmsg
        })
      } else {
        return res.send({
          code: 200,
          message: '用户成功',
          data: user
        })
      }
    })
  },
  loginout: (req, res) => {
    req.session.sessionID = null
    return res.send({
      code: 200,
      message: '退出成功',
      data: true
    })
  },
  userInfo: (req, res) => {
    if (req.query.role === 'admin') {
      return res.send({
        code: 200,
        message: '获取成功',
        data: {
          role: ['admin']
        }
      })
    } else {
      return res.sendStatus(200).send({
        code: 200,
        message: '获取成功',
        data: {
          role: ['user']
        }
      })
    }
  }
}

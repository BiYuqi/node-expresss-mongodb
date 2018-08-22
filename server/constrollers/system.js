const User = require('../models/users')
const Msg = require('../utils/msg')
module.exports = {
  login: (req, res) => {
    const {username, password} = req.body
    User.find().then((user) => {
      if (user && user.length > 0) {
        for (let i = 0; i < user.length; i++) {
          if (user[i].username === username) {
            if (user[i].password === password) {
              req.session.sessionID = username
              Msg(res, 200, '登录成功',
                {
                  userInfo: user
                }
              )
              break
            } else {
              Msg(res, 10006, '用户密码错误',
                {
                  userInfo: user
                }
              )
              break
            }
          }
        }
        Msg(res, 10000, '用户不存在, 请注册')
      } else {
        Msg(res, 10000, '用户不存在, 请注册')
      }
    })
  },
  register: (req, res) => {
    User.create(req.body, (err, user) => {
      if (err) {
        Msg(res, 500, '用户创建失败',
          {
            data: err.errmsg
          }
        )
      } else {
        Msg(res, 200, '用户成功',
          {
            data: user
          }
        )
      }
    })
  },
  loginout: (req, res) => {
    req.session.sessionID = null
    Msg(res, 200, '退出成功',
      {
        data: true
      }
    )
  },
  userInfo: (req, res) => {
    if (req.query.role === 'admin') {
      res.json({
        data: {
          role: ['admin']
        }
      })
    } else {
      res.json({
        data: {
          role: ['user']
        }
      })
    }
  }
}

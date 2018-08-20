const express = require('express')
const User = require('../models/users')
const router = express.Router()
router.post('/login', (req, res) => {
  const {username, password} = req.body
  User.find().then((user) => {
    if (user && user.length > 0) {
      for (let i = 0; i < user.length; i++) {
        if (user[i].username === username && user[i].password === password) {
          req.session.sessionID = username
          res.send({
            status: 200,
            data: {
              message: '登录成功',
              userInfo: user
            }
          })
          break
        }
      }
      res.send({
        status: 10000,
        data: {
          message: '用户不存在'
        }
      })
    } else {
      res.send({
        status: 10000,
        data: {
          message: '用户不存在,请注册'
        }
      })
    }
  })
})
router.post('/register', (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      res.json(err)
    }
    res.send({
      status: 200,
      success: true
    })
  })
})

router.post('/loginout', (req, res) => {
  req.session.sessionID = null
  res.send({
    status: 200,
    success: true
  })
})

router.get('/userInfo', (req, res) => {
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
})
module.exports = router

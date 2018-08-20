const express = require('express')
const User = require('../constrollers/system')
const router = express.Router()

router.post('/login', User.login)

router.post('/register', User.create)

router.post('/loginout', User.loginout)

router.get('/userInfo', User.userInfo)

module.exports = router

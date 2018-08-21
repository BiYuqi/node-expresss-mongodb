const mongoose = require('mongoose')
const CONFIG = require('../config/config')
mongoose.connect(CONFIG.db)
mongoose.Promise = global.Promise
mongoose.connection.on('connected', () => {
  console.log('数据库已经连接上')
})
mongoose.connection.on('error', () => {
  console.log('数据库连接失败')
})
module.exports = mongoose

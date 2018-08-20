const mongoose = require('mongoose')
const BASE_PATH = 'mongodb://127.0.0.1:27017/nodeExpress'
mongoose.connect(BASE_PATH)
mongoose.Promise = global.Promise
mongoose.connection.on('connected', () => {
  console.log('数据库已经连接上')
})
mongoose.connection.on('error', () => {
  console.log('数据库连接失败')
})
module.exports = mongoose

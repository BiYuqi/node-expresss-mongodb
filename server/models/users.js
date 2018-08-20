const mongoose = require('mongoose')
const db = require('./connect')

const user = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String
})

module.exports = db.model('user', user)

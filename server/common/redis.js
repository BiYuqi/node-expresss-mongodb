const Redis = require('ioredis')
const config = require('../config/config')

const client = new Redis({
  port: config.redis_port,
  host: config.redis_host,
  db: config.redis_db,
  password: config.redis_password
})

client.on('error', err => {
  if (err) {
    process.exit(1)
  }
})
module.exports = client

const qn = require('qn')
const config = require('../config/config')

let qnClient = null
if (config.qn_access && config.qn_access.secretKey !== 'your sceret key') {
  qnClient = qn.create(config.qn_access)
}
module.exports = qnClient

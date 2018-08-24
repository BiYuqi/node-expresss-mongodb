const path = require('path')
/**
 *很多配置还没启用
 目前使用了端口还有db
*/
const config = {
  debug: true,
  name: 'Node+Express+MongoDB',
  db: 'mongodb://127.0.0.1:27017/nodeExpress',
  port: 7085,
  redis_host: '127.0.0.1',
  redis_port: 6379,
  redis_db: 0,
  redis_password: '',
  user_token_name: 'loadingmore',
  session_secret: 'loadingmore',
  upload: {
    path: path.join(__dirname, '/upload'),
    url: '/upload'
  },
  qn_access: {
    accessKey: 'your access key',
    secretKey: 'your secret key',
    bucket: 'your bucket name',
    origin: 'http://your qiniu domain',
    // 如果vps在国外，请使用 http://up.qiniug.com/ ，这是七牛的国际节点
    // 如果在国内，此项请留空
    uploadURL: 'http://xxxxxxxx'
  },
  // github 登陆的配置
  GITHUB_OAUTH: {
    clientID: 'your GITHUB_CLIENT_ID',
    clientSecret: 'your GITHUB_CLIENT_SECRET',
    callbackURL: 'http://cnodejs.org/auth/github/callback'
  },
  // 是否允许直接注册（否则只能走 github 的方式）
  allow_sign_up: true
}
module.exports = config

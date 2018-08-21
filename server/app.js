const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const index = require('./routes/index')
const product = require('./routes/product')
const system = require('./routes/system')
const upload = require('./routes/upload')
const CONFIG = require('./config/config')
const app = express()

app.use(session({
  secret: CONFIG.session_secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60
  },
  rolling: false
}))
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})
// 上传的图片地址
app.use('/upload', express.static('upload'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// 接口
app.use('/', index)
app.use('/product', product)
app.use('/system', system)
app.use('/upload', upload)

app.use((req, res, next) => {
  console.log(req, res)
  next()
})
app.listen(process.env.PORT || CONFIG.port, () => {
  console.log('HTTP Server is running in http://localhost:' + CONFIG.port)
})

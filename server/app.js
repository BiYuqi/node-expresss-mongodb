const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const index = require('./router/index')
const product = require('./routes/product')
const system = require('./routes/system')
const upload = require('./routes/upload')
const app = express()

app.use(session({
  secret: 'loadingmore',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 5
  },
  rolling: true
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
app.listen(process.env.PORT || 7085, () => {
  console.log('HTTP Server is running in http://localhost:7085')
})

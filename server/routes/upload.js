const express = require('express')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    const fileType = file.originalname.match(/\.(\w+)$/)[1]
    console.log(file.fieldname + '-' + Date.now() + '.' + fileType)
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileType)
  }
})
const BaseUpload = multer({
  storage: storage
})

router.post('/upload', BaseUpload.single('goods'), (req, res) => {
  const file = req.file
  const size = file.size
  const path = file.path
  const mimetype = file.mimetype
  const originalname = file.originalname
  res.send({
    status: 200,
    data: {
      message: '上传成功',
      size,
      path,
      mimetype,
      originalname
    }
  })
})

module.exports = router

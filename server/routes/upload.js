const express = require('express')
const multer = require('multer')
const Upload = require('../constrollers/upload')
const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
})
const BaseUpload = multer({
  storage: storage
})

router.post('/upload', BaseUpload.single('GOODS'), Upload.upload)

module.exports = router

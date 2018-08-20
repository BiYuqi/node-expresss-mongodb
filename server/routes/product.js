const express = require('express')
const products = require('../constrollers/product')
const router = express.Router()

router.get('/find', products.find)

router.post('/insert', products.insert)

router.post('/delete', products.delete)

module.exports = router

const express = require('express')
const Product = require('../models/product')

const router = express.Router()

router.get('/find', (req, res) => {
  Product.find(req.query).then(goods => {
    res.send({
      status: 200,
      data: goods
    })
  }).catch(e => {
    res.send({
      status: 500,
      data: {
        message: e
      }
    })
  })
})

router.post('/insert', (req, res) => {
  Product.create(req.body, (err, good) => {
    if (err) {
      res.send({
        status: 1006,
        data: {
          message: '商品插入异常'
        }
      })
    }
    res.send({
      status: 200,
      data: good
    })
  })
})

router.post('/delete', (req, res) => {
  Product.findOneAndRemove({
    _id: req.body.id
  }).then(good => {
    res.send({
      status: 200,
      data: {
        message: good
      }
    })
  })
})

module.exports = router

const Product = require('../models/product')
module.exports = {
  find: (req, res, next) => {
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
  },
  insert: (req, res, next) => {
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
  },
  delete: (req, res, next) => {
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
  }
}

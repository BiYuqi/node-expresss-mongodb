const Product = require('../models/product')
module.exports = {
  find: (req, res) => {
    // 支持模糊查询
    let query = {}
    Object.keys(req.query).forEach(item => {
      query[item] = new RegExp(req.query[item])
    })
    Product.find(query).then(goods => {
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
  insert: (req, res) => {
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

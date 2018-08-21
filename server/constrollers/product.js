const Product = require('../models/product')
module.exports = {
  find: (req, res) => {
    /**
     * 支持分页查询
     * 支持模糊查询
    */
    let start = req.query.start || 1
    let size = req.query.size || 10
    let skip = (start * size) - size
    let queryName = Object.keys(req.query)
    let query = {}
    for (let i = 0; i < queryName.length; i++) {
      if (queryName[i] === 'start' || queryName[i] === 'size') {
        continue
      }
      query[queryName[i]] = new RegExp(req.query[queryName[i]])
    }
    Product.find(query).skip(skip).limit(~~size).then(goods => {
      Product.count(query).then(count => {
        res.send({
          status: 200,
          data: {
            list: goods,
            total: count
          }
        })
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

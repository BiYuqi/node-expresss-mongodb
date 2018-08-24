const Product = require('../models/product')
module.exports = {
  find: (req, res) => {
    /**
     * 支持分页查询
     * 支持模糊查询
    */
    const start = req.query.start || 1
    const size = parseInt(req.query.size, 10) || 10
    const skip = (start * size) - size
    const queryName = Object.keys(req.query)
    const query = {}
    for (let i = 0; i < queryName.length; i++) {
      if (queryName[i] !== 'start' && queryName[i] !== 'size') {
        query[queryName[i]] = new RegExp(req.query[queryName[i]], 'ig')
      }
    }
    Product.find(query).skip(skip).limit(size).then(goods => {
      Product.count(query).then(count => {
        return res.send({
          code: 200,
          message: '查询成功',
          data: {
            list: goods,
            total: count
          }
        })
      })
    }).catch(e => {
      return res.send({
        code: 500,
        message: '查询失败',
        data: {
          message: e
        }
      })
    })
  },
  insert: (req, res) => {
    Product.create(req.body, (err, good) => {
      if (err) {
        return res.send({
          code: 1006,
          message: '商品插入异常',
          data: {
            message: err
          }
        })
      }
      return res.send({
        code: 200,
        message: '插入成功',
        data: {
          message: good
        }
      })
    })
  },
  delete: (req, res) => {
    Product.findOneAndRemove({
      _id: req.body.id
    }).then(good => {
      return res.send({
        code: 200,
        message: '删除成功',
        data: null
      })
    })
  }
}

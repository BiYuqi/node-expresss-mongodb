const Product = require('../models/product')
const Msg = require('../utils/msg')
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
        Msg(res, 200, '查询成功',
          {
            list: goods,
            total: count
          }
        )
      })
    }).catch(e => {
      Msg(res, 500, '查询失败',
        {
          message: e
        }
      )
    })
  },
  insert: (req, res) => {
    Product.create(req.body, (err, good) => {
      if (err) {
        Msg(res, 1006, '商品插入异常',
          {
            message: err
          }
        )
        return
      }
      Msg(res, 200, '插入成功',
        {
          message: good
        }
      )
    })
  },
  delete: (req, res) => {
    Product.findOneAndRemove({
      _id: req.body.id
    }).then(good => {
      Msg(res, 200, '删除成功')
    })
  }
}

module.exports = (res, status, message, data = null) => {
  res.send({
    status,
    message,
    data
  })
}

/**
 * 无需加token校验的接口配文件
*/
const baseFilter = [
  '/system/login',
  '/system/register'
]
const checkPath = (path) => {
  let flag = false
  let len = baseFilter.length
  for (let i = 0; i < len; i++) {
    if (path === baseFilter[i]) {
      flag = true
      break
    }
  }
  return flag
}
module.exports = checkPath

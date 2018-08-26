import axios from 'axios'
import Cookie from 'js-cookie'
import store from '../store'
import { Message } from 'element-ui'
import { userLoginout } from '@/api/userInfo'
// base setting
const BASE_URL = 'http://localhost:7085'
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 20000
})

service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json; charset=UTF-8'
  config.headers['Authorization'] = Cookie.get('uut') || ''
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(response => {
  /**
  * 这里可以做接口相关的拦截设置
  */
  const res = response.data
  if (res.code === 401) {
    Message({
      message: res.data,
      type: 'error',
      duration: 3 * 1000
    })
    Cookie.remove('user')
    Cookie.remove('role')
    Cookie.remove('uut')
    Cookie.remove('cid')
    localStorage.removeItem('pageOpenedList')
    store.commit('clearAllTags')
    store.commit('user/RESET_ROLE') // 清除角色
    store.commit('permiss/RM_ROUTES') // 清空routes for sidebar
    setTimeout(() => {
      userLoginout().then(res => {
        location.reload()
      })
    }, 3000)
  }
  return response
}, error => {
  Message({
    message: error.message,
    type: 'error',
    duration: 6 * 1000
  })
  return Promise.reject(error)
})

export default service

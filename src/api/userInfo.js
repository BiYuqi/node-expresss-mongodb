import request from '@/utils/request'

export const fetchUserInfo = (query) => {
  return request({
    url: '/system/userInfo',
    method: 'get',
    params: query
  })
}

export const userLogin = (params) => {
  return request({
    method: 'post',
    url: '/system/login',
    data: params
  })
}

export const userRegister = (params) => {
  return request({
    method: 'post',
    url: '/system/register',
    data: params
  })
}

export const userLoginout = () => {
  return request({
    method: 'post',
    url: '/system/loginout'
  })
}

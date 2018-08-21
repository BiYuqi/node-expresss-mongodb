import request from '@/utils/request'

export const deleteGood = (param) => {
  return request({
    url: '/product/delete',
    method: 'post',
    data: param
  })
}

export const addGood = (param) => {
  return request({
    url: '/product/insert',
    method: 'post',
    data: param
  })
}

export const findGood = (params) => {
  return request({
    url: '/product/find',
    method: 'get',
    params
  })
}

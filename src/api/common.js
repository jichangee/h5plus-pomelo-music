import request from '../utils/request'

/**
 * 获取乐器列表
 */
export const musicalInstruments = (params) => {
  return request({
    url: `/musical`,
    method: 'get',
    params
  })
}

export const banner = (params) => {
  return request({
    url: '/banner',
    method: 'get',
    params
  })
}

export const teacher = ({ id }) => {
  return request({
    url: `/teacher/${id}`,
    method: 'get',
  })
}

export const coupon = (params) => {
  return request({
    url: `/coupon`,
    method: 'get',
    params
  })
}

export const getCoupon = ({ id }) => {
  return request({
    url: `/coupon/${id}`,
    method: 'post',
  })
}
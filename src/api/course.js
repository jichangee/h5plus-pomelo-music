import request from '../utils/request'

const area = '/course';

/**
 * 课程列表
 */
export const list = (params) => {
  return request({
    url: `${area}`,
    method: 'get',
    params
  })
}

/**
 * 课程详情
 */
export const detail = ({ id }) => {
  return request({
    url: `${area}/${id}`,
    method: 'get',
  })
}
/**
 * 生成订单
 */
export const order = (data) => {
  return request({
    url: `${area}/${data.id}/order`,
    method: 'post',
    data
  })
}

/**
 * 收藏
 */
export const collect = ({ id }) => {
  return request({
    url: `${area}/${id}/collect`,
    method: 'get',
  })
}
/**
 * 支付宝支付
 */
export const alipay = (data) => {
  return request({
    url: `${area}/${data.id}/alipay`,
    method: 'post',
    data
  })
}
/**
 * 微信支付
 */
export const wxpay = (data) => {
  return request({
    url: `${area}/${data.id}/wxpay`,
    method: 'post',
    data
  })
}
/**
 * 评论
 */
export const evaluate = (data) => {
  return request({
    url: `${area}/evaluate`,
    method: 'post',
    data
  })
}
import request from '../utils/request'

const area = '/product';

/**
 * 商品首页
 */
export const index = (params) => {
  return request({
    url: `${area}/index`,
    method: 'get',
    params
  })
}
/**
 * 商品类别
 */
export const typeList = (params) => {
  return request({
    url: `${area}/types`,
    method: 'get',
    params
  })
}
/**
 * 获取某类商品列表
 */
export const type = (params) => {
  return request({
    url: `${area}`,
    method: 'get',
    params
  })
}
/**
 * 获取商品详情
 */
export const detail = ({ id }) => {
  return request({
    url: `${area}/${id}`,
    method: 'get'
  })
}
/**
 * 购买商品
 */
export const buy = (data) => {
  return request({
    url: `${area}/${data.id}/buy`,
    method: 'post',
    data
  })
}
/**
 * 购买商品
 */
export const alipay = (data) => {
  return request({
    url: `${area}/${data.Id}/alipay`,
    method: 'post',
    data
  })
}
/**
 * 购买商品
 */
export const wxpay = (data) => {
  return request({
    url: `${area}/${data.Id}/wxpay`,
    method: 'post',
    data
  })
}

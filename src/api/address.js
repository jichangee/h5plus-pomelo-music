import request from '../utils/request'

const area = '/user/address';

/**
 * 删除收件人
 */
export const deleteAddress = ({ id }) => {
  return request({
    url: `${area}/${id}`,
    method: 'delete'
  })
}
/**
 * 获取收件人信息
 */
export const getAddress = ({ id }) => {
  return request({
    url: `${area}/${id}`,
    method: 'get'
  })
}
/**
 * 更新收件人信息
 */
export const updateAddress = (data) => {
  return request({
    url: `${area}/${data.id}`,
    method: 'put',
    data
  })
}
/**
 * 获取收件人信息列表
 */
export const list = () => {
  return request({
    url: `${area}/`,
    method: 'get'
  })
}
/**
 * 添加收件人
 */
export const add = (data) => {
  return request({
    url: `${area}/`,
    method: 'post',
    data
  })
}

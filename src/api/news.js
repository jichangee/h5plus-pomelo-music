import request from '../utils/request'

const area = '/news';

/**
 * 专题列表
 */
export const list = (params) => {
  return request({
    url: `${area}`,
    method: 'get',
    params
  })
}
/**
 * 专题详情
 */
export const detail = ({ id }) => {
  return request({
    url: `${area}/${id}`,
    method: 'get',
  })
}
/**
 * 报名
 */
export const apply = (data) => {
  return request({
    url: `${area}/${data.id}/apply`,
    method: 'post',
    data
  })
}

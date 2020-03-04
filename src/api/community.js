import request from '../utils/request'

const area = '/community';

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
 * 评论
 */
export const comment = (data) => {
  return request({
    url: `${area}/${data.id}/comment`,
    method: 'post',
    data
  })
}
/**
 * 点赞
 */
export const like = ({ id, commentId }) => {
  return request({
    url: `${area}/${id}/comment/${commentId}/like`,
    method: 'post',
  })
}
/**
 * 上传
 */
export const upload = (data) => {
  return request({
    url: `${area}/upload`,
    method: 'post',
    data
  })
}
/**
 * 发布帖子
 */
export const pubilsh = (data) => {
  return request({
    url: `${area}`,
    method: 'post',
    data
  })
}

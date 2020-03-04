import request from '../utils/request'

const area = '/youshow'

export const deleteShow = ({ id }) => {
  return request({
    url: `${area}/${id}`,
    method: 'delete',
  })
}
/**
 * 获取柚秀详情
 */
export const detail = ({ id }) => {
  return request({
    url: `${area}/${id}`,
    method: 'get',
  })
}
/**
 * 点赞/取消赞
 */
export const like = ({ id }) => {
  return request({
    url: `${area}/${id}/like`,
    method: 'post',
  })
}
/**
 * 获取评论列表
 */
export const commentList = (params) => {
  return request({
    url: `${area}/${params.id}/comment`,
    method: 'get',
    params
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
 * 评论点赞
 */
export const commentLike = ({ id, commentId }) => {
  return request({
    url: `${area}/${id}/comment/${commentId}/like`,
    method: 'post',
  })
}
/**
 * 删除评论
 */
export const deleteComment = (data) => {
  return request({
    url: `${area}/${data.id}/comment/${data.commentId}`,
    method: 'delete',
  })
}
/**
 * 上传柚秀视频
 */
export const upload = (data) => {
  return request({
    url: `${area}/upload`,
    method: 'post',
    data
  })
}
/**
 * 获取柚秀列表
 */
export const list = (params) => {
  return request({
    url: `${area}`,
    method: 'get',
    params
  })
}
/**
 * 发布柚秀
 */
export const publish = (data) => {
  return request({
    url: `${area}`,
    method: 'post',
    data
  })
}

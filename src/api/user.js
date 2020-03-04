import request from '../utils/request'

const area = 'user'
/**
 * 登录
 */
export const signin = (data) => {
  return request({
    url: '/signin',
    method: 'post',
    data
  })
}
/**
 * 判断是否已经注册
 */
export const isBind = (params) => {
  return request({
    url: '/user/isbind',
    method: 'get',
    params
  })
}
/**
 * 微信登录
 */
export const wxSignin = (data) => {
  return request({
    url: '/oauth/wechat',
    method: 'post',
    data
  })
}
/**
 * 登出
 */
export const signout = (data) => {
  return request({
    url: '/signout',
    method: 'post',
    data
  })
}
export const index = (params) => {
  return request({
    url: `${area}/index`,
    method: 'get',
    params
  })
}
export const list = (params) => {
  return request({
    url: `${area}`,
    method: 'get',
    params
  })
}
export const show = (params) => {
  return request({
    url: `${area}/show`,
    method: 'get',
    params
  })
}
export const userShow = (params) => {
  return request({
    url: `${area}/show/${params.userId}`,
    method: 'get',
    params
  })
}
export const userCollectShow = (params) => {
  return request({
    url: `${area}/collect/show/${params.userId}`,
    method: 'get',
    params
  })
}
export const course = (params) => {
  return request({
    url: `${area}/course`,
    method: 'get',
    params
  })
}
export const collectShow = (params) => {
  return request({
    url: `${area}/collect/show`,
    method: 'get',
    params
  })
}
export const collectCourse = (params) => {
  return request({
    url: `${area}/collect/course`,
    method: 'get',
    params
  })
}
/**
 * 获取当前登录信息
 */
export const myinfo = (params) => {
  return request({
    url: `${area}/myinfo`,
    method: 'get',
    params
  })
}
/**
 * 获取其他用户登录信息
 */
export const info = ({ id }) => {
  return request({
    url: `${area}/info/${id}`,
    method: 'get',
  })
}
/**
 * 关注
 */
export const like = ({ userId }) => {
  return request({
    url: `${area}/like/${userId}`,
    method: 'post',
  })
}
/**
 * 实名认证
 */
export const approve = (data) => {
  return request({
    url: `${area}/approve`,
    method: 'post',
    data
  })
}
/**
 * 实名认证
 */
export const upload = (data) => {
  return request({
    url: `${area}/upload`,
    method: 'post',
    data
  })
}
/**
 * 设置照片
 */
export const photo = (data) => {
  return request({
    url: `${area}/photo`,
    method: 'post',
    data
  })
}
/**
 * 设置个人信息
 */
export const infoUpdate = (data) => {
  return request({
    url: `${area}/info`,
    method: 'post',
    data
  })
}
/**
 * 添加收件人
 */
export const consigneeAdd = (data) => {
  return request({
    url: `${area}/consignee/add`,
    method: 'post',
    data
  })
}
/**
 * 更新收件人
 */
export const consigneeUpdate = (data) => {
  return request({
    url: `${area}/consignee/update`,
    method: 'post',
    data
  })
}
/**
 * 删除收件人
 */
export const consigneeDelete = (data) => {
  return request({
    url: `${area}/consignee/delete`,
    method: 'post',
    data
  })
}
/**
 * 订单列表
 */
export const products = (params) => {
  return request({
    url: `${area}/products`,
    method: 'get',
    params
  })
}
/**
 * 订单详情
 */
export const productDetail = ({ id }) => {
  return request({
    url: `${area}/products/${id}`,
    method: 'get',
  })
}
/**
 * 订单详情
 */
export const points = () => {
  return request({
    url: `${area}/points`,
    method: 'get',
  })
}
/**
 * 订单详情
 */
export const pointRecord = (params) => {
  return request({
    url: `${area}/pointRecord`,
    method: 'get',
    params
  })
}
/**
 * 通知列表
 */
export const notify = (params) => {
  return request({
    url: `${area}/notify`,
    method: 'get',
    params
  })
}
/**
 * 签到
 */
export const checkin = (data) => {
  return request({
    url: `/Home/checkin`,
    method: 'post',
    data
  })
}
/**
 * 申请售后
 */
export const service = (data) => {
  return request({
    url: `${area}/products/service`,
    method: 'post',
    data
  })
}
/**
 * 优惠券列表
 */
export const coupon = (params) => {
  return request({
    url: `${area}/coupon`,
    method: 'get',
    params
  })
}
/**
 * 关注人列表
 */
export const idol = (params) => {
  return request({
    url: `${area}/idol/${params.id}`,
    method: 'get',
    params
  })
}
/**
 * 粉丝列表
 */
export const fans = (params) => {
  return request({
    url: `${area}/fans/${params.id}`,
    method: 'get',
    params
  })
}
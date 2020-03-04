import request from '../utils/request'

const area = '/home';

/**
 * 商品首页
 */
export const get = (params) => {
  return request({
    url: `${area}`,
    method: 'get',
    params
  })
}

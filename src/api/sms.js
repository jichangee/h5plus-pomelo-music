import request from '../utils/request'

export const get = (data) => {
  return request({
    url: '/SMS',
    method: 'POST',
    data
  })
}
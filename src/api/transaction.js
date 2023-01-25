import request from '@/utils/request'
export function getListTransaction(query) {
  return request({
    url: '/transactions',
    method: 'get',
    params: query
  })
}

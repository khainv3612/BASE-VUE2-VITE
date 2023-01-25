import request from '@/utils/request'

export function getAllSystemInfo(query) {
  return request({
    url: '/statistics',
    method: 'get',
    params: query
  })
}

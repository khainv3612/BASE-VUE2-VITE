import request from '@/utils/request'

export function getHistoryPrediction(query) {
  return request({
    url: '/predictions',
    method: 'get',
    params: query
  })
}

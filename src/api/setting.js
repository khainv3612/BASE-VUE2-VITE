import request from '@/utils/request'

export function getAllSetting() {
  return request({
    url: '/settings',
    method: 'get',
    params: {}
  })
}

export function updateSetting(id, data = {}) {
  return request({
    url: `/settings/${id}`,
    method: 'post',
    data
  })
}

export function getAllFooterSetting() {
  return request({
    url: '/footer',
    method: 'get',
    params: {}
  })
}

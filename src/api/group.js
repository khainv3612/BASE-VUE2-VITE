import request from '@/utils/request'
export function getListGroup(query) {
  return request({
    url: '/groups',
    method: 'get',
    params: query
  })
}

export function updateGroup(id, group) {
  return request({
    url: `/groups/${id}/update`,
    method: 'post',
    data: group
  })
}


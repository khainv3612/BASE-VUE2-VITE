import request from '@/utils/request'
export function getListTeam(query) {
  return request({
    url: '/teams',
    method: 'get',
    params: query
  })
}

export function getAllStatus() {
  return request({
    url: '/teams/status',
    method: 'get',
    params: {}
  })
}
export function getAllGroups() {
  return request({
    url: '/teams/group',
    method: 'get',
    params: {}
  })
}
export function updateTeam(id, team) {
  return request({
    url: `/teams/${id}/update`,
    method: 'post',
    data: team
  })
}


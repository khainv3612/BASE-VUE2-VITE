import request from '@/utils/request'
export function getListMatch(query) {
  return request({
    url: '/matches',
    method: 'get',
    params: query
  })
}

// export function getAllTeams() {
//   return request({
//     url: '/teams/all',
//     method: 'get',
//     params: {}
//   })
// }
// export function updateGroup(id, group) {
//   return request({
//     url: `/groups/${id}/update`,
//     method: 'post',
//     data: group
//   })
// }
//

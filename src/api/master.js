import request from '@/utils/request'

export function fetch(query) {
  return request({
    url: '/master-data',
    method: 'get',
    params: query
  })
}

export function getListUser(query) {
  return request({
    url: '/users',
    method: 'get',
    params: query
  })
}

export function updateStatusUser(id) {
  return request({
    url: `users/${id}/change-status`,
    method: 'post'
  })
}

export function getDetailUser(id) {
  return request({
    url: `users/${id}`,
    method: 'get'
  })
}

export function getListTransations(query) {
  return request({
    url: '/transactions',
    method: 'get',
    params: query
  })
}

export function getTreeUser() {
  return request({
    url: `nodes`,
    method: 'get'
  })
}

export function getTreeUserById(id) {
  return request({
    url: `users/tree/${id}`,
    method: 'get'
  })
}

export function searchMail(mail) {
  return request({
    url: `users/search?email=${mail}`,
    method: 'get'
  })
}

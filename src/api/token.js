import request from '@/utils/request'

export function getListToken() {
  return request({
    url: '/tokens',
    method: 'get'
  })
}

export function getDetailToken(query) {
  return request({
    url: '/tokens/list',
    method: 'get',
    params: query
  })
}

export function getAllTeams(data) {
  return request({
    url: '/teams/all?search=' + data,
    method: 'get'
  })
}

export function getHistoryBuyToken(query) {
  return request({
    url: '/tokens/history-buy',
    method: 'get',
    params: query
  })
}

export function getTypeHistory() {
  return request({
    url: '/tokens/history-type',
    method: 'get'
  })
}

export function getHistoryOpenBox(query) {
  return request({
    url: '/tokens/history-open',
    method: 'get',
    params: query
  })
}


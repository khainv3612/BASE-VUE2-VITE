import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'auth/login',
    method: 'post',
    data
  })
}

export function forgotPassword(data) {
  return request({
    url: 'forgot-password',
    method: 'post',
    data
  })
}

export function resetPassword(data) {
  return request({
    url: `forgot-password/reset`,
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: 'auth/me',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'auth/logout',
    method: 'post'
  })
}

export function changePassword(data) {
  return request({
    url: 'auth/change-password',
    method: 'post',
    data
  })
}

export function checkToken(data) {
  return request({
    url: 'forgot-password/reset/check-token',
    method: 'post',
    data
  })
}

import request from '../request'

export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/users/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/users/getUserInfo',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}

export function userEdit(userInfo) {
  return request({
    url: '/users/userEdit',
    method: 'post',
    data:userInfo,
  })
}

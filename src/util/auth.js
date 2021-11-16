// import Cookies from 'js-cookie'
import storage from 'store'
import {ACCESS_TOKEN,USER_ROLE} from "@/store/mutation-types";
// const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return window.localStorage.getItem('token')
}

export function getUserInfo() {
  return storage.get('userInfo')
}

export function setToken(token) {
  return window.localStorage.setItem('token', token)
}

export function removeToken() {
  return window.localStorage.removeItem('token')
}

export function logout() {
  storage.set(ACCESS_TOKEN, null)
}

export function needLogin(str) {
  let whiteUrl = ['/login', '/register']
  return whiteUrl.indexOf(str) === -1 ? true : false
}

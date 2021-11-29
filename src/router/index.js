import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import storage from 'store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
import findLast from 'lodash/findLast';
import { needLogin, logout } from "@/util/auth"
import { ACCESS_TOKEN, USER_ROLE } from "@/store/mutation-types";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/front',
    children: [
      {
        path: 'front',
        name: 'front',
        component: () => import(/* webpackChunkName: "about" */ '../views/front.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      }
    ]
  },
  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/login.vue')
  },
  { path: '*', redirect: '/404', hidden: true }

]


const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


router.beforeEach((to, from, next) => {
  //显示加载的进度条
  if (to.path !== from.path) {
    NProgress.start()
  }
  const token = storage.get(ACCESS_TOKEN)
  //前往不需要登录的页面时，如果已登录过，需要先退出，清除token
  if (!needLogin(to.path)) {
    if (!token) {
      logout()
    }
    next()
  } else {
    // 前往需要登陆的页面，如果用户还没登陆，跳向登陆页
    if (!token) {
      next({ path: '/login' })
    } else {
      const record = findLast(to.matched, record => record.meta.authority)
      // 用户已经登陆但没有该页面权限
      if (record && !check(record.meta.authority)) {
        Message({
          message: '您没有查看该页面的权限',
          duration: 1000
        })
        next({ path: '/403' })
      }
      next()
    }
  }
  NProgress.done()
})


export default router

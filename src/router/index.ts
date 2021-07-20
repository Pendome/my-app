import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'app', // 路由 name
    path: '/',
    redirect: '/home'
  },
  {
    name: 'home', // 路由 name
    path: '/home',
    meta: {
      title: '首页',
      name: '首页',
      href: '',
      isTab: false
    },
    component: () => import('@/views/home/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

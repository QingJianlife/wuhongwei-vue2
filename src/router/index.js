import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import ('@/views/layout/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import ('@/views/login/index.vue'),
    meta: {
      title: '登陆页'
    }
  },
  {
    path: '/threejs',
    name: 'threejs',
    component: () => import ('@/views/three/index.vue'),
    meta: {
      title: '3d页面'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'home',
    component: () => import("@/views/Home.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/Login/Login.vue")
  },
  {
    path: '/password',
    name: 'password',
    component: () => import("@/views/Login/Password.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

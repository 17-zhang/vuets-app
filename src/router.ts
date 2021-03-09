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

const router:any = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 登录之前，做个拦截
router.beforeEach((to:any, from:any, next:any) => {
  const isLogin = localStorage.tsToken ? true :  false;  // 判断是否登录成功，成功返回true,失败返回false
  if(to.path == '/login' || to.path == '/password') {   // 判断to.path是否是登录界面或者忘记密码界面
    next(); // 是，继续跳转
  } else {  
    isLogin ? next() : next('/login');  //是，继续跳转  否，重新登录
  }
})

export default router

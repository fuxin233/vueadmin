import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/sys/User'
import Admin from '../views/sys/Admin'
import Register from '../views/Register'
import  Index from '../views/index'
import GPU from '../views/sys/GPU'
import CPU from '../views/sys/CPU'
import Power from '../views/sys/Power'
import Memory from '../views/sys/Memory'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/usersCenter',
        name: 'UserCenter',
        meta: {
          title:"个人中心"
        },
        component: () => import('@/views/UserCenter')
      },
      {
        path: '/User',
        name: 'User',
        component: User,
        meta:{
          title: "用户管理"
        }
      },
      {
        path: '/Admin',
        name: 'Admin',
        component: Admin,
        meta:{
          title: "管理员管理"
        }
      },
      {
        path: '/Gpu',
        name: 'Gpu',
        component: GPU,
        meta:{
          title: "GPU信息管理"
        }
      },
      {
        path: '/Cpu',
        name: 'Cpu',
        component: CPU,
        meta:{
          title: "CPU信息管理"
        }
      },
      {
        path: '/Power',
        name: 'Power',
        component: Power,
        meta:{
          title: "电源信息管理"
        }
      },
      {
        path: '/Memory',
        name: 'Memory',
        component: Memory,
        meta:{
          title: "内存信息管理"
        }
      }

    ]
  },

  {
    path: '/login',
    name: 'Login',

    component: () => import( '../views/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path:'/',
    redirect:'/login'　　//默认显示
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

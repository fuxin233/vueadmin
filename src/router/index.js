import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminHome from '../views/sys/AdminHome.vue'
import User from '../views/sys/User'
import Admin from '../views/sys/Article'
import AdminIndex from '../views/sys/AdminIndex'
import GPU from '../views/sys/GPU'
import CPU from '../views/sys/CPU'
import Power from '../views/sys/Power'
import Memory from '../views/sys/Memory'
import Comment from '../views/sys/Comment'
import ComputerList from "../views/sys/ComputerList";
import Harddisk from "../views/sys/Harddisk";
import Mainboard from "../views/sys/Mainboard";
import Pccase from "../views/sys/Pccase";
import UserLogin from "../views/external/UserLogin";
import UserHome from "../views/external/UserHome";
import UserIndex from "../views/external/UserIndex";
import UserCpuSingle from "../views/external/UserCpuSingle";
import UserCpuMulti from "../views/external/UserCpuMulti";
import UserHarddisk from "../views/external/UserHarddisk";
import UserMainboard from "../views/external/UserMainboard";
import UserMemory from "../views/external/UserMemory";
import UserPower from "../views/external/UserPower";
import UserPccase from "../views/external/UserPccase";
import ArticleHome from "../views/external/ArticleHome";
import UserArticle from "../views/external/UserArticle";
import ArticleDetail from "../views/external/ArticleDetail";
import UserCenter from "../views/external/UserCenter";
import Assembling from "../views/external/Assembling";
Vue.use(VueRouter)

const routes = [
  {
    path: '/AdminHome',
    name: 'AdminHome',
    component: AdminHome,
    children:[
      {
        path: '/AdminIndex',
        name: 'AdminIndex',
        component: AdminIndex
      },
      {
        path: '/AdminCenter',
        name: 'AdminCenter',
        meta: {
          title:"个人中心"
        },
        component: () => import('@/views/sys/AdminCenter')
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
        path: '/Article',
        name: 'Article',
        component: Admin,
        meta:{
          title: "文章管理"
        }
      },
      {
        path: '/Comment',
        name: 'Comment',
        component: Comment,
        meta:{
          title: "评论管理"
        }
      },
      {
        path: '/ComputerList',
        name: 'ComputerList',
        component: ComputerList,
        meta:{
          title: "配置单管理"
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
        path: '/Harddisk',
        name: 'Harddisk',
        component: Harddisk,
        meta:{
          title: "硬盘信息管理"
        }
      },
      {
        path: '/Mainboard',
        name: 'Mainboard',
        component: Mainboard,
        meta:{
          title: "主板信息管理"
        }
      },
      {
        path: '/Memory',
        name: 'Memory',
        component: Memory,
        meta:{
          title: "内存信息管理"
        }
      },
      {
        path: '/Pccase',
        name: 'Pccase',
        component: Pccase,
        meta:{
          title: "机箱信息管理"
        }
      },
      {
        path: '/Power',
        name: 'Power',
        component: Power,
        meta:{
          title: "电源信息管理"
        }
      }


    ]
  },
  {
    path: '/UserHome',
    name: 'UserHome',
    component: UserHome,
    children:[
      {
        path: '/UserIndex',
        name: 'UserIndex',
        component: UserIndex
      },
      {
        path: '/UserCpuSingle',
        name: 'UserCpuSingle',
        component: UserCpuSingle
      },
      {
        path: '/UserCpuMulti',
        name: 'UserCpuMulti',
        component: UserCpuMulti
      },
      {
        path: '/UserHarddisk',
        name: 'UserHarddisk',
        component: UserHarddisk
      },
      {
        path: '/UserMainboard',
        name: 'UserMainboard',
        component: UserMainboard
      },
      {
        path: '/UserMemory',
        name: 'UserMemory',
        component: UserMemory
      },
      {
        path: '/UserPccase',
        name: 'UserPccase',
        component: UserPccase
      },
      {
        path: '/UserPower',
        name: 'UserPower',
        component: UserPower
      },

    ]
  },
  {
    path: '/ArticleHome',
    name: 'ArticleHome',
    component: ArticleHome,
    children:[
      {
        path: '/UserArticle',
        name: 'UserArticle',
        component: UserArticle
      },
      {
        path: '/ArticleDetail',
        name: 'ArticleDetail',
        component: ArticleDetail
      },
      {
        path: '/UserCenter',
        name: 'UserCenter',
        component: UserCenter
      },

    ]
  },
  {
    path: '/AdminLogin',
    name: 'AdminLogin',

    component: () => import( '../views/sys/AdminLogin')
  },
  {
    path: '/UserLogin',
    name: 'UserLogin',
    component : UserLogin
  },
  {
    path: '/Assembling',
    name: 'Assembling',
    component: Assembling
  },
  {
    path:'/',
    redirect:'/UserLogin'　　//默认显示
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

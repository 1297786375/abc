import Vue from 'vue'
import Router from 'vue-router'


const index = ()=>import('../pages/index/index');
const admin = ()=>import('../pages/admin/admin');
const banner = ()=>import('../pages/banner/banner');
const classify = ()=>import('../pages/classify/classify');
const goods = ()=>import('../pages/goods/goods');
const home = ()=>import('../pages/home/home');
const login = ()=>import('../pages/login/login');
const menu = ()=>import('../pages/menu/menu');
const role = ()=>import('../pages/role/role');
const seckill = ()=>import('../pages/seckill/seckill');
const spec = ()=>import('../pages/spec/spec');
const vip = ()=>import('../pages/vip/vip');

Vue.use(Router)
export const indexRouter = [
  {
    path:'menu',
    component:menu,
    name:'菜单管理'
  },
  {
    path:'role',
    component:role,
    name:'角色管理'
  },
  {
    path:'admin',
    component:admin,
    name:'管理员管理'
  },
  {
    path:'classify',
    component:classify,
    name:'商品分类',
  },
  {
    path:'spec',
    component:spec,
    name:'商品规格',
  },
  {
    path:'goods',
    component:goods,
    name:'商品管理'
  },
  {
    path:'vip',
    component:vip,
    name:'会员管理'
  },
  {
    path:'banner',
    component:banner,
    name:'轮播图管理'
  },
  {
    path:'seckill',
    component:seckill,
    name:'秒杀活动'
  }
]

export default new Router({
  routes: [
    {
      path:'/',
      component:login,
    },
    {
      path:'/login',
      component:login,
    },
    {
      path:'/index',
      component:index,
      children:[
        {
          path:'home',
          component:home,
          name:'首页',
        },
        {
          path:'',
          redirect:'home',
        },
        
          ...indexRouter
        
      ]
    }
  ]
})

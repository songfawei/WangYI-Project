import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Category from '../views/Category.vue'
// import Cart from '../views/Cart.vue'
// import Profile from '../views/Profile.vue'
// import Search from '../views/Search'
// import Detail from '../views/Detail.vue'
// import CategoryDetail from '../views/CategoryDetail.vue'
// import Login from '../views/Login.vue'
// import Regist from '../views/Regist.vue'
// import Order from '../views/Order.vue'
// import MyOrder from '../views/MyOrder.vue'

Vue.use(VueRouter)

const routes = [
{
  path:'/',
  name:'Home',
  component:Home,
  meta:{
    title:'首页'
  }
},
{
  path:'/Category',
  name:'Category',
  // component:Category,
  component:()=>import('../views/Category.vue'),
  meta:{
    keepAlive:true,
    title:'分类'

  }
},{
  path:'/Cart',
  name:'Cart',
  // component:Cart,
  component:()=>import('../views/Cart.vue'),
  meta:{
    title:'购物车'
  }
},{
  path:'/Profile',
  name:'Profile',
  // component:Profile,
  component:()=>import('../views/Profile.vue'),
  
  meta:{
    title:'个人'
  },
  children:[
    {
      path:'login',
      name:'Login',
      // component:Login,
      component:()=>import('../views/Login.vue'),
      meta:{
        title:'个人'
      }
    },
    {
      path:'regist',
      name:'Regist',
      // component:Regist,
      component:()=>import('../views/Regist.vue'),
      meta:{
        title:'个人'
      }
    }
  ]
},
{
  path:'/search',
  name:'Search',
  // component:Search
  component:()=>import('../views/Search.vue'),
  meta:{
    title:'搜索'
  }
},
{
  path:'/detail/:id',//附带参数id
  name:'Detail',
  // component:Detail,
  component:()=>import('../views/Detail.vue'),
  meta:{
    title:'详情'
  }
},
{
  path:'/cateDetail/:cateId/:subId',
  name:'CategoryDetail',
  // component:CategoryDetail,
  component:()=>import('../views/CategoryDetail.vue'),
  meta:{
    title:'分类详情'
  }
},{
  path:'/order/:orderNo',
  name:'Order',
  // component:Order,
  component:()=>import('../views/Order.vue'),
  meta:{
    title:'订单'
  }
},{
  path:'/myOrder',
  name:'MyOrder',
  // component:MyOrder,
  component:()=>import('../views/MyOrder.vue'),
  meta:{
    title:'我的订单'
  }
}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title=to.meta.title
  }
  next()
})
export default router

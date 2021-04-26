import Vue from 'vue'

//1）引入相关模块(路由模块   子路由vue)
import VueRouter from "vue-router"
 import Home from '../components/Domo1'
 import About from '../components/Domo2'
import xszweilcom from "../components/xiaosaiz/xszweilcom";


//2）Vue组件使用Vue-router组件
Vue.use(VueRouter)

//3)配置路由组

 var routes=[{path:"/home",component:Home},
   {path:"/about",component:About},
   {path:"/xszweilcom",component:xszweilcom},
 ]

//4)配置路由管理器
var router = new VueRouter({
  routes
});

export default router



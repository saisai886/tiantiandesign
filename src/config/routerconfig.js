import Vue from 'vue'

//1）引入相关模块(路由模块   子路由vue)
import VueRouter from "vue-router"
import xszweilcom from "../components/xiaosaiz/xszweilcom";
import shanghuShouye from "../components/hesijie/ShanghuShouye";
//张蓓如下:-----------------
import zb_denglu from '../components/zhangbei/zb_denglu'
import zb_hotai from "../components/zhangbei/zb_hotai";
//底-----------------------
// //========供货商
import indexsup from '../components/jiangweijie/indexsup'  //主页
// //=========
//2）Vue组件使用Vue-router组件
Vue.use(VueRouter)


//3)配置路由组

 var routes=[{path:"/xszweilcom",component:xszweilcom},
   {path:"/shanghuShouye",component:shanghuShouye},
   //张蓓如下:-----------------
   {path:"/zb_denglu",component:zb_denglu},
   {path:"/zb_hotai",component:zb_hotai},
   //底-----------------------
   {path:"/indexsup",component: indexsup}
 ]

//4)配置路由管理器
var router = new VueRouter({
  routes
});

export default router



import Vue from 'vue'

//1）引入相关模块(路由模块   子路由vue)
import VueRouter from "vue-router"
 import Home from '../components/Domo1'
 import About from '../components/Domo2'
import xszweilcom from "../components/xiaosaiz/xszweilcom";
//========供货商
import indexsup from '../components/jiangweijie/indexsup'  //主页
import shangpingwh from '../components/jiangweijie/supshangpingwh' //商城维护
import supshangpingsogo from "../components/jiangweijie/supshangpingsogo"; //采购管理
import supshangpingchuku from "../components/jiangweijie/supshangpingchuku";//出库管理
import supshangpingchukujilu from "../components/jiangweijie/supshangpingchukujilu";//出库记录
import supshangpinghowu from "../components/jiangweijie/supshangpinghowu";//货物统计
import supshangpingcaiwu from "../components/jiangweijie/supshangpingcaiwu";//财务统计
//=========
//2）Vue组件使用Vue-router组件
Vue.use(VueRouter)

//3)配置路由组

 var routes=[{path:"/home",component:Home},
   {path:"/about",component:About},
   {path:"/xszweilcom",component:xszweilcom},
   {path:"/indexsup",component: indexsup},
   {path:"/shangpingwh",component: shangpingwh},
   {path:"/supshangpingsogo",component: supshangpingsogo},
   {path:"/supshangingchuku",component: supshangpingchuku},
   {path:"/supshangpingchukujilu",component: supshangpingchukujilu},
   {path:"/supshangpinghowu",component: supshangpinghowu},
   {path:"/supshangpingcaiwu",component: supshangpingcaiwu}
 ]

//4)配置路由管理器
var router = new VueRouter({
  routes
});

export default router



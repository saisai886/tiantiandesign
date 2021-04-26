import Vue from 'vue'
import App from './App.vue'

//导入路由管理器
import Router from './config/routerconfig'
//导入vuex
import Store from './vuex/store'
//导入elementui
import  ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入axios
import Axios from 'axios'

Vue.use(ElementUI)


//配置后端服务器地址
Axios.defaults.baseURL="http://127.0.0.1:8090/tian"
// //将baseURL绑定到全局
Vue.prototype.$axios = Axios


new Vue({
  el: '#app',
  render: h => h(App),
  //将路由挂载到vue对象
  router:Router,
  //挂载vuex
  store:Store


})

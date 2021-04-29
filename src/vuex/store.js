import  Vue from 'vue'
import  Vuex from 'Vuex'

Vue.use(Vuex)


var store = new Vuex.Store({
  //相当于Vue对象中data
  state:{
    ygsession:"",
  },
  //属性的get方法
  getters:{
   getsessios(state){
    return state.ygsession
    }
  },
  //属性的set方法  同步
  mutations:{
    setsessios(state,val){
      return state.ygsession = val

    }
  },
  //属性的set方法  异步
  actions:{

  }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:null,
    cartNum:0
  },
  getters: {
  },
  mutations: {
    setUserinfo(state,userinfo){
    state.userinfo=userinfo
    },
    setCartNum(state,num){
      state.cartNum+=num
    },
    initCartNum(state,num){
    state.cartNum=num

    }
  },
  actions: {
  },
  modules: {
  }
})

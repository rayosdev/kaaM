import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    footerOpen: "false"
  },
  mutations: {
    setFooterOpen(state, payload){
      console.log("que passa aqui")
      state.footerOpen = payload
    }
  },
  actions: {

  },
  getters: {
    getFooterOpen: state => state.footerOpen
  },
  modules: {
  }
})

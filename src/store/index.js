import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    footerOpen: false,
    playerName: "",
  },
  mutations: {
    setFooterOpen(state, payload){
      state.footerOpen = payload
    },
    setPlayerName(state, payload){
      state.playerName = payload
    }
  },
  actions: {

  },
  getters: {
    getFooterOpen: state => state.footerOpen,
    getPlayerName: state => state.playerName
  },
  modules: {
  }
})

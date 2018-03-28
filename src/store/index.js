import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hola: 'Mundo',
    limpiar: false
  },
  mutations: {
    cambiarHola (state, value) {
      state.hola = value
    },
    limpiarForm (state, value) {
      state.limpiar = value
    }
  }
})

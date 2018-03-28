// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// Importanto nuestro plugin e instalándolo
import http from './lib/http'
Vue.use(http, {
  url: 'http://localhost:4000/api-rest/' // Definiendo nuestro url del backend
})

// Instalando Vuetify y definiendo colores
Vue.use(Vuetify, {
  theme: {
    primary: '#5867dd',
    secondary: '#ffffff',
    info: '#36a3f7',
    warning: '#ffb822',
    error: '#f4516c',
    success: '#34bfa3'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

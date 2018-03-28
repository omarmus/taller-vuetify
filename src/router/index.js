import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Empresas from '@/components/Empresas'
import Usuarios from '@/components/Usuarios'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/empresas',
      name: 'Empresas',
      component: Empresas
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: Usuarios
    }
  ]
})

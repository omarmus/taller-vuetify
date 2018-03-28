<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      dark
      app
    >
      <app-menu></app-menu>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <div class="app">
        <router-view/>
      </div>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import AppMenu from './components/AppMenu'

export default {
  components: {
    AppMenu
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: true,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      title: 'Proyecto Vuetify'
    }
  },
  name: 'App'
}
</script>

<style lang="scss">
@import './assets/scss/index';

.app {
  padding: 30px;
}
</style>
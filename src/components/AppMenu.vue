<template>
  <nav>
    <h1 class="app-title"><v-icon large>pets</v-icon> Proyecto Vuetify</h1>
    <v-list>
      <v-list-tile
        v-for="item in items"
        :prepend-icon="item.icon"
        :key="item.title"
        :class="{ active: path === item.url }"
        @click="go(item.url)">
        <v-list-tile-action>
          <v-icon color="warning">{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </nav>
</template>

<script>
export default {
  mounted () {
    this.path = this.$route.path
  },
  data () {
    return {
      path: '/',
      items: [
        { title: 'Home', url: '/', icon: 'home' },
        { title: 'Empresas', url: '/empresas', icon: 'account_balance' },
        { title: 'Usuarios', url: '/usuarios', icon: 'person' }
      ]
    }
  },
  methods: {
    go (url) {
      // Redireccionamos a la url solicitada
      this.$router.push(url)
    }
  },
  watch: {
    // Escuchando los cambios del $router
    '$route' (to, from) {
      this.path = to.path
    }
  }
}
</script>

<style lang="scss">
$menu: #2c2e3e;
$link: #868aa8;

.application .theme--dark.navigation-drawer, .theme--dark .navigation-drawer {
  background-color: $menu;
}

.list__tile.list__tile--link {
  color: $link;
}

.list__tile__action, .list__tile__avatar {
  min-width: 42px;
}

.app-title {
  font-weight: 300;
  font-size: 1.8rem;
  color: white;
  margin: 0;
  line-height: 60px;
  height: 66px;
  padding: 0 20px;
  background-color: rgba(0, 0, 0, 0.3);
}
.active {
  .list__tile.list__tile--link {
    background-color: darken($menu, 5%);
    color: white;
  }
}
</style>
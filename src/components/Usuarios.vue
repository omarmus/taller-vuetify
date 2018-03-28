<template>
  <section>
    <agregar-usuario v-if="show && !lista" :item="usuario"></agregar-usuario>
    <div v-if="lista">
      <h2>Lista de usuarios</h2>
      <div class="btn-container">
        <v-btn
          color="primary"
          @click="agregar">
          <v-icon>add</v-icon> Agregar nuevo
        </v-btn>
      </div>
      <v-data-table
        :headers="headers"
        :items="items"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.nombre }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.edad }}</td>
          <td>{{ getEmpresa(props.item.id_empresa) }}</td>
          <td class="text-xs-center">
            <v-btn 
              color="error" 
              small
              @click="eliminar(props.item.id)"><v-icon>delete</v-icon></v-btn>
            <v-btn
              small
              @click="editar(props.item.id)">
              <v-icon>edit</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </div>
  </section>
</template>

<script>
import AgregarUsuario from './AgregarUsuario'
import EventBus from '@/lib/event-bus'
import Empresa from '@/mixins/empresa'

export default {
  mixins: [ Empresa ],
  mounted () {
    this.listaEmpresas()
    this.listar()

    EventBus.$on('listar', valor => {
      this.lista = true
      this.listar()
    })

    EventBus.$on('cancelar', () => {
      this.lista = true
    })

    // this.$store.state.hola = 'Nuevo' no hacer asi
    this.$store.commit('cambiarHola', 'Esta es la forma correcta')
    console.log('Hola', this.$store.state.hola)
  },
  components: {
    AgregarUsuario
  },
  data () {
    return {
      lista: true,
      headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Email', value: 'email' },
        { text: 'Edad', value: 'edad' },
        { text: 'Empresa', value: 'id_empresa' },
        { text: 'Acciones', sortable: false, align: 'center' }
      ],
      items: [],
      usuario: null,
      show: true
    }
  },
  methods: {
    // método para obtener el nombre de la empresa en base al id_empresa
    getEmpresa (id) {
      if (this.empresas && this.empresas.length) {
        for (let i in this.empresas) {
          if (id === this.empresas[i].id) {
            return this.empresas[i].nombre
          }
        }
      }
      return id
    },
    listar () {
      this.$http.get(`usuarios`)
        .then(respuesta => {
          this.items = respuesta
        })
    },
    eliminar (id) {
      if (confirm('¿Eliminar?')) {
        this.$http.delete(`usuarios/${id}`)
          .then(respuesta => {
            this.listar()
          })
      }
    },
    editar (id) {
      this.show = false
      this.$http.get(`usuarios/${id}`)
        .then(respuesta => {
          console.log(respuesta)
          this.usuario = respuesta
          this.lista = false
          this.show = true
        })
    },
    agregar () {
      this.lista = false
      this.show = false
      this.usuario = null // Limpiamos el usuario para renderizar de nuevo el componente
      this.$nextTick(() => { // Nos crea una pausa para poder renderizar el componente
        this.show = true
      })
    }
  }
}
</script>
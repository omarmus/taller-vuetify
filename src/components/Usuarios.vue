<template>
  <section>
    <agregar-usuario></agregar-usuario>
    <div>
      <h2>Lista de usuarios</h2>
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
          <td>{{ props.item.id_empresa }}</td>
          <td>
            <v-btn 
              color="error" 
              small
              @click="eliminar(props.item.id)"><v-icon>delete</v-icon></v-btn>
          </td>
        </template>
      </v-data-table>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import AgregarUsuario from './AgregarUsuario'

const url = 'http://localhost:4000/api-rest/'

export default {
  mounted () {
    this.listar()
  },
  components: {
    AgregarUsuario
  },
  data () {
    return {
      headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Email', value: 'email' },
        { text: 'Edad', value: 'edad' },
        { text: 'Empresa', value: 'id_empresa' },
        { text: 'Acciones', sortable: false }
      ],
      items: []
    }
  },
  methods: {
    listar () {
      axios.get(`${url}usuarios`)
        .then(respuesta => {
          console.log(respuesta.data)
          this.items = respuesta.data
        })
    },
    eliminar (id) {
      if (confirm('¿Eliminar?')) {
        axios.delete(`${url}usuarios/${id}`)
          .then(respuesta => {
            this.listar()
          })
      }
    }
  }
}
</script>
<template>
  <section>
    <div class="form" v-if="!lista">
      <h2>Agregar empresa</h2>
      <form @submit.prevent="enviar">
        <v-text-field
          label="Nombre"
          v-model="nombre"
          required></v-text-field>
        <v-text-field
          label="Dirección"
          v-model="direccion"
          required></v-text-field>        
  
        <v-btn type="button" @click="lista = true">Cancelar</v-btn>
        <v-btn color="primary" type="submit">Enviar</v-btn>
      </form>
    </div>
    <div class="lista" v-if="lista">
      <h2>Lista de empresas</h2>
      <div class="btn-container">
        <v-btn color="primary" @click="mostrarForm"><v-icon>add</v-icon> Agregar nuevo</v-btn>
      </div>
      <table class="table elevation-1">
        <thead>
          <tr>
            <th class="column">Nombre</th>
            <th class="column">Dirección</th>
            <th class="column">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in empresas" :key="item.id">
            <td>{{ item.nombre }}</td>
            <td>{{ item.direccion }}</td>
            <td class="text-xs-center">
              <v-btn
                color="error"
                small
                type="button"
                @click="eliminar(item.id)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn
                small
                type="button"
                @click="editar(item.id)">
                <v-icon>edit</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      empresas: [],
      id: '',
      nombre: '',
      direccion: '',
      lista: true
    }
  },
  created () {
    this.listar()
  },
  methods: {
    listar () {
      this.$http.get(`empresas`)
        .then(respuesta => {
          this.empresas = respuesta
        })
    },
    enviar () {
      if (this.id) {
        // actualizar
        let datos = {
          id: this.id,
          nombre: this.nombre,
          direccion: this.direccion
        }
        this.$http.put(`empresas/${this.id}`, datos)
          .then(respuesta => {
            this.listar()
            this.lista = true
          })
      } else {
        // crear
        let datos = {
          nombre: this.nombre,
          direccion: this.direccion
        }
        console.log('enviado', datos)
        this.$http.post(`empresas`, datos)
          .then(respuesta => {
            this.listar()
            this.lista = true
          })
      }
    },
    eliminar (id) {
      if (confirm('¿Eliminar?')) {
        this.$http.delete(`empresas/${id}`)
          .then(respuesta => {
            this.listar()
          })
      }
    },
    editar (id) {
      this.$http.get(`empresas/${id}`)
        .then(respuesta => {
          let empresa = respuesta
          this.id = empresa.id
          this.nombre = empresa.nombre
          this.direccion = empresa.direccion
          this.lista = false
        })
    },
    mostrarForm () {
      this.lista = false
      this.id = ''
      this.nombre = ''
      this.direccion = ''
    }
  },
  watch: {
    'nombre': function (val) {
      console.log('Escuchando nombre', val)
    }
  }
}
</script>

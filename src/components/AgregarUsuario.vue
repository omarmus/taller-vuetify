<template>
  <section>
    <h2>Agregar usuario</h2>
    <v-form
      @submit.prevent="enviar"
      ref="form" 
      lazy-validation>
      <v-text-field
        label="Nombre"
        v-model="nombre"
        :rules="required"
        required>
      </v-text-field>
      <v-text-field
        label="Email"
        v-model="email"
        :rules="required"
        required>
      </v-text-field>
      <v-text-field
        label="Edad"
        v-model="edad">
      </v-text-field>
      <v-select
        label="Empresa"
        :items="empresas"
        item-value="id"
        item-text="nombre"
        v-model="empresa"
        :rules="required"
        required>
      </v-select>
      <v-btn>Cancelar</v-btn>
      <v-btn
        color="primary"
        type="submit">
        <v-icon>check_circle</v-icon>Enviar</v-btn>
    </v-form>
  </section>
</template>

<script>
import Empresa from '@/mixins/empresa'
import axios from 'axios'

const url = 'http://localhost:4000/api-rest/'

export default {
  mixins: [ Empresa ],
  mounted () {
    this.listaEmpresas('empresas')
  },
  data () {
    return {
      nombre: '',
      email: '',
      edad: '',
      empresa: '',
      required: [v => !!v || 'Campo requerido'],
      empresas: []
    }
  },
  methods: {
    enviar () {
      if (this.$refs.form.validate()) {
        console.log('enviar!')
        const datos = {
          nombre: this.nombre,
          email: this.email,
          edad: this.edad,
          id_empresa: this.empresa
        }
        axios.post(`${url}usuarios`, datos)
          .then(respuesta => {
            console.log(respuesta.data)
          })
      }
    }
  }
}
</script>

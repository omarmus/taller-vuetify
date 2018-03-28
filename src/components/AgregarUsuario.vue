<template>
  <section>
    <h2>{{ id ? 'Editar' : 'Agregar' }} usuario</h2>
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
      <v-btn @click="cancelar">Cancelar</v-btn>
      <v-btn
        color="primary"
        type="submit">
        <v-icon>check_circle</v-icon>Guardar</v-btn>
    </v-form>
  </section>
</template>

<script>
import Empresa from '@/mixins/empresa'
import EventBus from '@/lib/event-bus'

export default {
  mixins: [ Empresa ],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    this.listaEmpresas('empresas')
    if (this.item) {
      this.id = this.item.id
      this.nombre = this.item.nombre
      this.email = this.item.email
      this.edad = this.item.edad
      this.empresa = this.item.id_empresa
    }
  },
  data () {
    return {
      id: null,
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
        const datos = {
          nombre: this.nombre,
          email: this.email,
          edad: this.edad,
          id_empresa: this.empresa
        }
        if (this.id) {
          // editar
          this.$http.put(`usuarios/${this.id}`, datos)
            .then(respuesta => {
              console.log('update!', respuesta)
              EventBus.$emit('listar', respuesta)
            })
        } else {
          // Agregar
          this.$http.post(`usuarios`, datos)
            .then(respuesta => {
              console.log(respuesta)
              EventBus.$emit('listar', respuesta)
            })
        }
      }
    },
    cancelar () {
      EventBus.$emit('cancelar')
    }
  }
}
</script>

import axios from 'axios'

const url = 'http://localhost:4000/api-rest/'

export default {
  methods: {
    listaEmpresas (prop = '') {
      axios.get(`${url}empresas`)
        .then(respuesta => {
          this[prop] = respuesta.data
          console.log('empresas', this[prop])
        })
    }
  }
}

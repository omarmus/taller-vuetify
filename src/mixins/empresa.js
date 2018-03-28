export default {
  methods: {
    listaEmpresas (prop = 'empresas') {
      this.$http.get(`empresas`)
        .then(respuesta => {
          this[prop] = respuesta
          console.log('empresas', this[prop])
        })
    }
  }
}

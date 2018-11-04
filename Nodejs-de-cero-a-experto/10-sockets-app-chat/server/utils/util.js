let crearMensaje = (usuario, mensaje) => {

    return {
        usuario,
        message: mensaje,
        fecha: new Date().getTime()
    }

}
module.exports = {
    crearMensaje
}
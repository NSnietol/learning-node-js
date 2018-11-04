const axios = require('axios');


const getDescripcion = async(direccion) => {


    let direccion1 = encodeURI(direccion);
    let answer = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${direccion1}&key=AIzaSyA-HXVa2jtkGfKtIJwisxgC46RaWqC1xuI`);


    if (answer.data.status == 'ZERO_RESULTS') {

        throw new Error(`Ǹo existe información para la dirección : ${direccion}`);
    } else {

        return {
            direccion: answer.data.results[0].formatted_address,
            latitud: answer.data.results[0].geometry.location.lat,
            longitud: answer.data.results[0].geometry.location.lng
        }


    }

}


module.exports = {
    getDescripcion
}
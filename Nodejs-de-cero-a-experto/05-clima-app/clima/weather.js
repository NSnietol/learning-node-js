const axios = require('axios');

const key = 'ae8c3550109bd65e6f959d67baf50a79';

const getClima = async(coord) => {

    result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coord.latitud}&lon=${coord.longitud}&units=metric&appid=${key}`);

    return result.data.main.temp;

}

module.exports = {
    getClima
}
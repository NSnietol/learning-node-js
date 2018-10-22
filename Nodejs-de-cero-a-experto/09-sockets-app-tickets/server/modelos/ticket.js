const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


let ticketControl = new Schema({

    ultimo: {
        type: Number,
        unique: true,
        required: [true, 'El valor del último atentido es requerido']
    },

    dia: {
        type: String,
        default: new Date().getDay()
    },
   
});



ticketControl.plugin(uniqueValidator,{message:'{PATH} debe ser único'});

module.exports = mongoose.model('Ticket', ticketControl);
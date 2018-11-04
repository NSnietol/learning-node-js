const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let roles_validos = {
    values:["ADMIN_ROLE","USER_ROLE","DEV_ROLE"],
    message:'{VALUE} no es un rol válido'
}

let usuarioSchema = new Schema({

    nombre: {
        type: String,
        uppercase:true,
        unique: true,
        required: [true, 'El nombre es necesario']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatoria']
    },
    img: {
        type: String,
        required: false,
        default:null
    },
    role: {
        type: String,
        uppercase:true,
        default: "USER_ROLE",
        enum:roles_validos
    },
    estado: {
        type: Boolean,  default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON=function(){

    let user  = this;
    let userObject=user.toObject();
    delete userObject.password;
    return userObject;

}


usuarioSchema.plugin(uniqueValidator,{message:'{PATH} debe ser único'});

module.exports = mongoose.model('Usuario', usuarioSchema);
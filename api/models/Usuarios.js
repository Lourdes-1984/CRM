const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const usuariosSchema = new Schema( {
    nombre: {
        type: String,
        require:'Agrega tu nombre'
    },
    email: {
        type: String,
        lowercase: true,
        unique:true,
        trim:true
    },
    password: {
        type: String,
        require:true
    }
});

module.exports=mongoose.model('Usuarios',usuariosSchema);
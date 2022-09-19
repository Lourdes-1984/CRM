const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const clientesSchema = new Schema({
    nombre:{
        type:String,
        
    },
    apellido:{
        type:String,
       
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true
    },
    empresa:{
        type:String,
       

    },
    telefono:{
        type:String,
        trim:true
    }
})
module.exports=mongoose.model('Clientes',clientesSchema);
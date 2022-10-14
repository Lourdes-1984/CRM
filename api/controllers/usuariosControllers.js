const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//CREAR UN USUARIO
exports.registrarUsuarios = async (req,res,next)=>{
    //leeer los datos del usuario y colocarlo  en usuarios
    const usuarioDB = await Usuarios.find({email:req.body.email});
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
         if(usuarioDB.length){
         return res.status(404).json({mensaje:'Usuario ya existe', usuarioDB})
     }
     await usuario.save();
     res.json({mensaje:'Usuario creado correctamente', usuario})
    } catch (error) {
        console.log(error);
        res.json({mensaje:'Hubo un error'})
    }

}
exports.obtenerUsuario = async (req,res,next) =>{
    const usuarios = await Usuarios.find();
    res.json({mensaje: 'consulta existosa', usuarios})
}
//AUTENTICAR UN USURAIO
exports.autenticarUsuario = async (req, res, next)=>{
    //buscar el usuario
    const{email,password} = req.body;
    const usuario = await Usuarios.findOne({email});
    if(!usuario){
        // si el usuario no exsiste
        await res.status(401).json({mensaje: 'Ese usuario no existe'});
        next();
    }else{
        //el usuarion existe , vierifica si el pássword esta correcto o incorrecto
        if(!bcrypt.compareSync(password, usuario.password)){
            //si el password es incorrecto
            await res.status(401).json({mensaje: 'Password incorrecto'});
            next();
        }else{
            //si el password es correcto firmar el token
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id : usuario._id
            },

            'LLAVESECRETA',{
                expiresIn : '10h'
            }
            );
            //retornar el token
            res.json({token , nombre:usuario.nombre})
        }

    }
}

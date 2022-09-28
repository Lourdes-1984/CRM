const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req,res)=>{
    //leeer los datos del usuario y colocarlo  en usuarios
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({mensaje:'Usuario creado correctamente'})
    } catch (error) {
        console.log(error);
        res.json({mensaje:'Hubo un error'})
    }

}
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
            //si el password es correcto crear el token
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
            res.json({token})
        }

    }
}

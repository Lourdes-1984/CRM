const Pedidos = require('../models/Pedidos');

//Agregar nuevos pedidos
exports.nuevoPedido = async(req,res,next)=>{
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje:'Se agrego nuevo pedido', pedido});
    } catch (error) {
        console.log(error);
        next()
    }
};
//Mostrar todos los pedidos
exports.mostrarPedidos = async(req,res,next) =>{
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path:'pedido.producto',
            model:'Productos'
        });
        res.json(pedidos)
    } catch (error) {
        console.log(error)
        next()
    }
};
//Mostrar un pedido por su ID
exports.mostrarPedido = async(req,res,next)=>{
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
         path:'pedido.producto',
            model:'Productos'
    });
    if(!pedido){
        res.json({mensaje: 'Ese pedido no existe'});
        return next();
    }
    //mostrar pedido
    res.json(pedido);
}
// Actualizar el pedido por su ID
exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate({_id : req.params.idPedido}, req.body, {
            new: true
        } )
        .populate('cliente')
        .populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        console.log( req.params.idPedido)
        res.json({mensaje:'pedido actualizado', pedido})
    } catch (error) {
        console.log('no se puedo actualizar el pedido', error);
        next();
    }
};
exports.eliminarPedido = async (req, res, next) =>{
    console.log( req.params.idPedido)
    try {
        await Pedidos.findOneAndDelete({_id : req.params.idPedido});
        res.json({mensaje:'El pedido se ha eliminado correctamente'})
    } catch (error) {
        console.log(error)
        next();
    }
};
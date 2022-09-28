const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosControllers');

//middle para proteger las rutas

const auth = require('../middleware/auth')

//-----------CRUD-------------------
module.exports = () => {
    //**CLIENTES */
//agregar nuevo cliente por POST
router.post('/clientes', auth, clienteController.nuevoCliente);
//obtener todos los clientes por GET
router.get('/clientes',auth,  clienteController.mostrarClientes);
//mostrar un cliente por su ID en especifico
router.get('/clientes/:idCliente', auth, clienteController.mostrarCliente);
//actualizar cliente por PUT
router.put('/clientes/:idCliente', auth, clienteController.actualizarCliente);
//eliminar cliente por DELETE
router.delete('/clientes/:idCliente',auth, clienteController.eliminarCliente);

//**PRODUCTOS */
//agregar nuevo producto
router.post('/productos', productosController.subirArchivo, productosController.nuevoProducto);
//mostrar nuevos producto
router.get('/productos', productosController.mostrarProductos);
//mostrar un producto por su ID en especifico
router.get('/productos/:idProducto', productosController.mostrarProducto);
//actualizar producto
router.put('/productos/:idProducto',auth, productosController.subirArchivo, productosController.actualizarProducto);
//eliminar producto
router.delete('/productos/:idProducto',auth, productosController.eliminarProducto);
//buscar un producto
router.post('/productos/busqueda/:query',auth, productosController.buscarProducto);

//**PEDIDOS */
//agrega nuevo pedido
router.post('/pedidos/nuevo/:idUsuario',auth, pedidosController.nuevoPedido);
//mostrar todos los pedidos
router.get('/pedidos', pedidosController.mostrarPedidos);
//mostrar un pedido por su ID
router.get('/pedidos/:idPedido',auth, pedidosController.mostrarPedido);
//actualizar pedido
router.put('/pedidos/:idPedido',auth, pedidosController.actualizarPedido);
//eliminar un pedido
router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);

//**USUARIOS */
//agregar un usuario
router.post('/crear-cuenta',auth, usuariosController.registrarUsuario);
//inicio de sesion
router.post('/iniciar-sesion',usuariosController.autenticarUsuario)


    
    return router;
}







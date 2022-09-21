const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController')



//-----------CRUD-------------------
module.exports = () => {
    //**CLIENTES */
//agregar nuevo cliente por POST
router.post('/clientes', clienteController.nuevoCliente);
//obtener todos los clientes por GET
router.get('/clientes', clienteController.mostrarClientes);
//mostrar un cliente por su ID en especifico
router.get('/clientes/:idCliente', clienteController.mostrarCliente);
//actualizar cliente por PUT
router.put('/clientes/:idCliente', clienteController.actualizarCliente);
//eliminar cliente por DELETE
router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

//**PRODUCTOS */
//agregar nuevo producto
router.post('/productos', productosController.subirArchivo, productosController.nuevoProducto);
//mostrar nuevos producto
router.get('/productos', productosController.mostrarProductos);
//mostrar un producto por su ID en especifico
router.get('/productos/:idProducto', productosController.mostrarProducto);
//actualizar producto
router.put('/productos/:idProducto', productosController.subirArchivo, productosController.actualizarProducto);
//eliminar producto
router.delete('/productos/:idProducto', productosController.eliminarProducto);
//buscar un producto
router.post('/productos/busqueda/:query', productosController.buscarProducto)
//**PEDIDOS */
//agrega nuevo pedido
router.post('/pedidos', pedidosController.nuevoPedido);
//mostrar todos los pedidos
router.get('/pedidos', pedidosController.mostrarPedidos);
//mostrar un pedido por su ID
router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);
//actualizar pedido
router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);
//eliminar un pedido
router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido)


    
    return router;
}







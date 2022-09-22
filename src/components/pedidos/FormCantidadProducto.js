import React from "react";

function FormCantidadProducto(props) {
  const {producto, restarProducto, aumentarProducto, eliminarProductoPedido,index}= props;
  return (
      <li>
        <div className="texto-producto">
          <p className="nombre">{producto.nombre}</p>
          <p className="precio">${producto.precio}</p>
        </div>
        <div className="acciones">
          <div className="contenedor-cantidad">
            <i className="fas fa-minus" onClick={() => restarProducto(index)}></i>
            <p>{producto.cantidad}</p>
            {/* <input type="text" name="cantidad" /> */}
            <i className="fas fa-plus"  onClick={() => aumentarProducto(index)}></i>
          </div>
          <button type="button" className="btn btn-rojo" onClick={() => eliminarProductoPedido(producto.producto)}> {/*o producto._id*/}
            <i className="fas fa-minus-circle"></i>
            Eliminar Producto
          </button>
        </div>
      </li>
  );
}

export default FormCantidadProducto;

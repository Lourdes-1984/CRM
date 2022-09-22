import React, { Fragment } from "react";

function DetallePedido(props) {
  const { cliente  } = props;

 
  return (
    <Fragment>
      <ul class="listado-pedidos">
        <li class="pedido">
          <div class="info-pedido">
            <p class="id">ID: 0192019201291201</p>
            <p class="nombre">Cliente: {cliente ? cliente.nombre : ''} {cliente ? cliente.apellido : ''}</p> 
            <div class="articulos-pedido">
              <p class="productos">Artículos Pedido: </p>
              <ul>
                {pedido.pedido.map(articulos =>(
                     <li key={pedido._id+articulos.producto._id}>
                     <p>{articulos.producto.nombre}</p>
                     <p>Precio: ${articulos.producto.precio}</p>
                     <p>Cantidad: {articulos.cantidad}</p>
                   </li>
                ) )}
               
               
              </ul>
            </div>
            <p class="total">Total: ${pedido.total} </p>
          </div>
          <div class="acciones">
            <button type="button" class="btn btn-rojo btn-eliminar">
              <i class="fas fa-times"></i>
              Eliminar Pedido
            </button>
          </div>
        </li>
      </ul>
    </Fragment>
  );
}

export default DetallePedido;

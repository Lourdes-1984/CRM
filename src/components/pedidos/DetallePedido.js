import React, { Fragment } from "react";
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2';

function DetallePedido(props) {
  const { cliente, pedido  } = props;

 //eliminar un pedido
 const eliminarPedido = id => {
  Swal.fire({
      title: '¿Estás Seguro?',
      text: "Un pedido eliminado ya no se puede recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar !',
      cancelButtonText: 'No, Cancelar !',
  }).then((result) => {
      if (result.value) {
          //llamando a axios eliminar de la api
          clienteAxios.delete(`/pedidos/${id}`)
          .then(res =>{
              if(res.status === 200){
                  Swal.fire(
                      'Eliminado!',
                      res.data.mensaje,
                      'success'
                    )
              }
              
          })
        
      }
    })
 }
console.log(pedido._id)
  return (
    <Fragment>
      <ul className="listado-pedidos">
        <li className="pedido">
          <div className="info-pedido">
            <p className="id">ID: 0192019201291201</p>
            <p className="nombre">Cliente: {cliente ? cliente.nombre : ''} {cliente ? cliente.apellido : ''}</p> 
            <div className="articulos-pedido">
              <p className="productos">Artículos Pedido: </p>
              <ul>
                {pedido && pedido?.map( (item) =>{
                  const {producto} = item;
                  return(
                    <li key={pedido._id+item._id}>
                    <p>{producto && producto.nombre}</p>
                    <p>Precio: ${producto && producto.precio}</p>
                    <p>Cantidad: {item.cantidad}</p>
                  </li>
                )
                })}
              </ul>
            </div>
            <p className="total">Total: ${props.total} </p>
          </div>
          <div className="acciones">
          <button    onClick={() => eliminarPedido(pedido._id)}  
            type="button" className="btn btn-rojo btn-eliminar"><i className="fas fa-times"></i> Eliminar Pedido</button>
          </div>
        </li>
      </ul>
    </Fragment>
  )
}

export default DetallePedido;

import React, { Fragment } from "react";
import clienteAxios from "../config/axios";
import { useNavigate } from 'react-router-dom';
import { URL_BASE } from '../../constantes';
import Swal from "sweetalert2";

function DetallePedido(props) {
  const navigate = useNavigate();
  const { cliente, idPedido, pedido ,imagen} = props;
  // const idPedido = pedido._id;

  //eliminar un pedido
  const eliminarPedido = (id) => {
    Swal.fire({
      title: "¿Estás Seguro?",
      text: "Un pedido eliminado ya no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar !",
      cancelButtonText: "No, Cancelar !",
    }).then((result) => {
      console.log(result);
      if (result.value) {
        //llamando a axios eliminar de la api
        clienteAxios.delete(`/pedidos/${id}`).then((res) => {
          if (res.status === 200) {
            Swal.fire("Eliminado!", res.data.mensaje, "success");
          }
        });
      }
    });
     navigate('/');
  };
  return (
    <Fragment>
      
      <div className="card">
        <li className="pedido">
          <div className="info-pedido">
            <p className="id">ID: {idPedido}</p>
            <p className="nombre">
              Cliente: {cliente ? cliente.nombre : ""}{" "}
              {cliente ? cliente.apellido : ""}
            </p>
            <div className="articulos-pedido">
              <p className="productos">Artículos Pedido: </p>
              <ul>
                {pedido &&
                  pedido?.map((item) => {
                    const { producto } = item;
                    return (
                      <li key={pedido._id + item._id}>
                        <p>{producto && producto.nombre}</p>
                        <p>Precio: ${producto && producto.precio}</p>
                        <p>Cantidad: {item.cantidad}</p>
                        
                        {
                imagen ? (
                    <img src={`${URL_BASE}/${producto && producto.imagen}`} alt= 'imagen' width= '100%'/>
                ): null }
               
                      </li>
                    );
                  })}
              </ul>
            </div>
            <p className="total">Total: ${props.total} </p>
            <div className="acciones">
            <button
              onClick={() => eliminarPedido(idPedido)}
              type="button"
              className="btn btn-rojo btn-eliminar"
            >
            <i class="fa-solid fa-trash"></i> Eliminar Pedido
            </button>
          </div>
            </div>
         
         
        </li>
      </div>
  
    
    </Fragment>
  );
}

export default DetallePedido;

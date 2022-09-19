import React from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';

function Producto({producto}) {

    //eliminar un producto
    const eliminarProducto = idProducto => {
        Swal.fire({
            title: '¿Estás Seguro?',
            text: "Un producto eliminado ya no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar !',
            cancelButtonText: 'No, Cancelar !',
        }).then((result) => {
            if (result.value) {
                //llamando a axios eliminar de la api
                clienteAxios.delete(`/productos/${idProducto}`)
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
    

    //extraer los valores
    const {_id , nombre, precio,descripcion, imagen, } = producto;
   
    return(

    <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">${precio}</p>
                <p className="precio">{descripcion}</p>
                {
                imagen ? (
                    <img src={`http://localhost:4000/${imagen}`} alt= 'imagen'/>
                ): null }
               
                
            </div>
            <div className="acciones">
                <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>
                <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarProducto(_id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
  )
}

export default Producto
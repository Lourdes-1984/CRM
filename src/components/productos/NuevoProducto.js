import React, {Fragment, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import  Swal from 'sweetalert2';
import clienteAxios from '../config/axios';


function NuevoProducto() {
  const navigate = useNavigate();

 //producto = state, guadarProductos = funcion para guardar el setState
 const [producto, guardarProducto]= useState({
  nombre:'',
  precio:'',
  descripcion:'',
});
//archivo = state, guardarArchivo = setState
const [archivo, guardarArchivo]= useState('');

//almacena un nuevo producto en la base de daatos
const agregarProducto = async e =>{
  e.preventDefault();
//crear el formdata para subir imagnes
const formData = new FormData();
formData.append('nombre', producto.nombre);
formData.append('precio', producto.precio);
formData.append('descripcion',producto.descripcion);
formData.append('imagen', archivo);

//almacenarlo en la base de datos
try {
  const res =  await clienteAxios.post('/productos', formData,{
     headers: {
       'Content-Type': 'multipart/form-data'
     }
   });
   if(res.status === 200){
    Swal.fire(
      'Agregado correctamente',
      res.data.mensaje,
      'success'
    )
   }
   setTimeout(()=>{
    
                        //REDIRECCIONAR
                        navigate('/productos');
                      },1000)
 } 
 catch (error) {
   console.log(error);
   //lanzar el alert
   Swal.fire({
     type: error,
     title:'Hubo un error',
     text:'Vuelva intentarlo'
   })
 }

}
//leer los datos del formulario
const leerInfoProducto = e =>{
  //almacenar lo que el usuario escribe en el state
  guardarProducto({
      //obtener una copia del state actual y agregar nuevo
  ...producto,
  [e.target.name]  : e.target.value
  })
}
//coloca la imagen en el state
const leerArchivo = e =>{
  guardarArchivo(e.target.files[0])
 
}

  return (
    <Fragment>
        <h2>Nuevo Producto</h2>

    <form onSubmit={agregarProducto}>
    <legend>Llena todos los campos</legend>

    <div className="campo">
        <label>Nombre:</label>
        <input type="text" placeholder="Nombre Producto" name="nombre" onChange={leerInfoProducto}/>
    </div>

    <div className="campo">
        <label>Precio:</label>
        <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio"  onChange={leerInfoProducto} />
    </div>
    
    <div className="campo">
        <label>Descripción:</label>
        <input type="text" name="descripcion" min="0.00" step="0.01" placeholder="Descripción"  onChange={leerInfoProducto} />
    </div>

    <div className="campo">
        <label>Imagen:</label>
        <input type="file"  name="imagen" onChange={leerArchivo}/> 
    </div>

    <div className="enviar">
            <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
    </div>
</form>
    </Fragment>
  
  )
}

export default NuevoProducto
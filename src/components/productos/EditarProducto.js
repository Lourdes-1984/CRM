import React, {Fragment, useState , useEffect}  from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
 import clienteAxios from '../config/axios';
 import Spinner from '../layout/Spinner'


function EditarProducto() {

   //obtener el id
   const {id} = useParams();
   const navigate = useNavigate();
   //producto = state , guardarProducto= funcion para actualizar
   const[producto , guardarProducto]= useState({
      nombre: '',
      precio: '',
      descripcion: '',
      imagen:''

   });

   //archivo = state, guardarArchivo = setState
const [archivo, guardarArchivo]= useState('');
   //QUERY A LA API para traer el producto a editar
   const consultarAPI = async ()=>{
    const productoConsulta = await clienteAxios.get(`/productos/${id}`)
    //colocar en el state
    guardarProducto(productoConsulta.data)
}
//useEffect , cuando el componente carga
useEffect(() =>{
    consultarAPI()
},[]);
//leer los datos del formulario
const leerInfoProducto = e =>{
  //almacenar lo que el usuario escribe en el state
  guardarProducto({
      //obtener una copia del state actual y agregar nuevo
  ...producto,
  [e.target.name]  : e.target.value
  })
};
//Editar un producto en la base de datos
  const editarProducto = async e =>{
    e.preventDefault();

    //crear el formdata para subir imagnes
const formData = new FormData();
formData.append('nombre', producto.nombre);
formData.append('precio', producto.precio);
formData.append('descripcion',producto.descripcion);
formData.append('imagen', archivo);

//almacenarlo en la base de datos
try {
  const res =  await clienteAxios.put(`/productos/${id}`, formData,{
     headers: {
       'Content-Type': 'multipart/form-data'
     }
   });
   if(res.status === 200){
    Swal.fire(
      'Editado correctamente',
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

//coloca la imagen en el state
const leerArchivo = e =>{
  guardarArchivo(e.target.files[0])
 
}

 //DESTRUCTURANDO extraer los valores del state
 const{nombre,precio,descripcion,imagen}= producto;
  //spinner de carga
 if(!nombre) return <Spinner/>

  return (
    <Fragment>
       <h2>EditarProducto</h2>

<form onSubmit={editarProducto}>
<legend>Llena todos los campos</legend>

<div className="campo">
    <label>Nombre:</label>
    <input type="text" placeholder="Nombre Producto" name="nombre" value={nombre} onChange={leerInfoProducto}/>
</div>

<div className="campo">
    <label>Precio:</label>
    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" value={precio} onChange={leerInfoProducto} />
</div>

<div className="campo">
    <label>Descripción:</label>
    <input type="text" name="descripcion" min="0.00" step="0.01" placeholder="Descripción" value={descripcion} onChange={leerInfoProducto} />
</div>

<div className="campo">
    <label>Imagen:</label>
    {imagen ? (
      <img src= {`http://localhost:4000/${imagen}`} alt='imagen' width= '300' />
    ) : null }
    <input type="file"  name="imagen" onChange={leerArchivo}/> 
</div>

<div className="enviar">
        <input type="submit" className="btn btn-azul" value="Editar Producto"/>
</div>
</form>
    </Fragment>
   
  )
}

export default EditarProducto
import React, {Fragment, useState , useEffect}  from 'react';
import { useNavigate, useParams } from 'react-router-dom';
 import Swal from 'sweetalert2';
 import clienteAxios from '../config/axios';

function EditarCliente() {
    //obtener el id
    const {id} = useParams();
    const navigate = useNavigate();
   
    
    //cliente = state guadarCliente = funcion para guardad el state
        const [cliente, datosCliente]= useState({
            nombre:'',
            apellido:'',
            empresa:'',
            email:'',
            telefono:''
        });
        //QUERY A LA API
        const consultarAPI = async ()=>{
            const clienteConsulta = await clienteAxios.get(`/clientes/${id}`)
           
            //colocar en el state
            datosCliente(clienteConsulta.data);
        }
        //useEffect , cuando el componente carga
        useEffect(() =>{
            consultarAPI();
        }, [] )

        //leer los datos del formulario
        const actualizarState = e =>{
            //almacenar lo que el usuario escribe en el state
            datosCliente({
                //obtener una co´pia del state actual
            ...cliente,
            [e.target.name]  : e.target.value
            })
        }
        //envia una peticion por axios para actualizar cliente
        const actualizarCliente = e =>{
            e.preventDefault();
             
            //enviar peticion por axios
            clienteAxios.put(`/clientes/${cliente._id}`,cliente)
            .then(res =>{
                //validar si hay error en momgo
                if(res.data.code === 11000){
                    Swal.fire({
                        type:'error',
                        title:'Hubo un error',
                        text:'El cliente ya existe'
                    })
                }
                else{
                    Swal.fire(
                        'Correcto!',
                        'Se actualizo Correctamente',
                        'success'
                      )
                }
                setTimeout(()=>{
                     //Redireccionar
                navigate('/')
                },1000)
               

            })
        }
        
          
        
        //validar el formulario
        const validarCliente=() =>{
            //DESTRUCTURANDO
            const{nombre,apellido,empresa,email,telefono}= cliente;
            //revisar que las propiedades del state temgam contendio
            let valido = !nombre.length ||  !apellido.length || !empresa.length || !email.length || !telefono.length;
            //retur true o false
            return valido
        }
  return (
   <Fragment>
     <h2>Editar Cliente</h2>
     <form onSubmit={actualizarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} value ={cliente.nombre}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido"  onChange={actualizarState}  value ={cliente.apellido}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa"  onChange={actualizarState} value ={cliente.empresa}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email"  onChange={actualizarState} value ={cliente.email}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono"  onChange={actualizarState} value ={cliente.telefono}/>
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Guardar Cambios"  disabled={validarCliente()}/>
                </div>

            </form>

   </Fragment>
  )
}
//HOC higherOrderComponent =componente de order superior
// un componente de orden superior es una función que toma un componente y devuelve un nuevo componente.
export default EditarCliente;
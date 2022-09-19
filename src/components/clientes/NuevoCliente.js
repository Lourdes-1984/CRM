import React, {Fragment, useState}  from 'react';
import clienteAxios from '../config/axios'

function NuevoCliente() {
    //cliente = state guadarCliente = funcion para guardad el state
        const [cliente, guardarClientes]= useState({
            nombre:'',
            apellido:'',
            empresa:'',
            email:'',
            telefono:''
        });
        //leer los datos del formulario
        const actualizarState = e =>{
            //almacenar lo que el usuario escribe en el state
            guardarClientes({
                //obtener una co´pia del state actual
            ...cliente,
            [e.target.name]  : e.target.value
            })
  

        }
        
            //añade a la API un cliente nuevo
            const AgregarCliente = e =>{
                e.preventDefault();
                //enviar peticion
                clienteAxios.post('/clientes', cliente)
                .then(res=>{
                    //validar si error en momgo
                    if(res.data.code ===11000){
                        console.log('Eroor de duplicado de mongo')
                    }
                    console.log(res)
                });
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
     <h2>NuevoCliente</h2>
     <form onSubmit={AgregarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido"  onChange={actualizarState}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa"  onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email"  onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono"  onChange={actualizarState}/>
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Cliente"  disabled={validarCliente()}/>
                </div>

            </form>

   </Fragment>
  )
}

export default NuevoCliente
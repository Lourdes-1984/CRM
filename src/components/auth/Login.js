import React, { Fragment, useContext, useState } from 'react';
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
//Context
import { CRMContext } from '../../context/CRMContext'

function Login() {

    // AUTH Y TOKEN
    const [auth, guardarAuth] = useContext(CRMContext);

    const navigate = useNavigate();

    //state con los datos del formulario
    const [credenciales, guardarCredenciales] = useState({})

    //iniciar sesion en el servidor
    const iniciarSesion = async e => {
        e.preventDefault();
        //autenticar el usuario
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
            //extraer el token y colocarlo en el localstorage
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            //colocarlo en el state
            guardarAuth({
                ...auth,
                token,
                auth: true
            })

            //alerta de inicio de sesion correcto
            Swal.fire(
                'Login Correcto',
                'Has inicado sesión',
                'success'
            )
            //redireccionar
            setTimeout(() => {
                navigate('/');
            }, 1000)

        } catch (error) {
            // console.log(error);
            if(error.response){
                Swal.fire({
                    type: 'error',
                    title: 'Hay un error',
                    text: error.response.data.mensaje
                })
            }else{
                Swal.fire({
                    type: 'error',
                    title: 'Hay un error',
                    text:   'Hubo un error'
                })
            }
            
        }
    }
    //almacenar lo que el usuario escribe en el state
    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }


    return (
        <Fragment>
            <div className='login'>
                <h2>Iniciar Sesión</h2>
                <div className='contenedor-formulario'>
                    <form onSubmit={iniciarSesion}>
                        <div className='campo'>
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email para Iniciar Sesión"
                                require
                                onChange={leerDatos}
                            />
                        </div>
                        <div className='campo'>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password para Iniciar Sesión"
                                require
                                onChange={leerDatos}
                                
                            />
                        </div>

                        <input
                            type="submit"
                            value="Iniciar Sesión "
                            className='btn btn-verde btn-block'
                            

                        />
                    </form>
                </div>
            </div>
        </Fragment>

    )
};

export default Login;

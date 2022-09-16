import React, {useEffect}from 'react';
//importar cliente axios
import clienteAxios from '../../config/axios';

function Clientes(){

    const consultarAPI = ()=>{
        console.log('consultando...')
    }
    useEffect(()=>{
        consultarAPI();
    })
    return(
        <h2>
            Clientes
        </h2>
    )
}
export default Clientes;
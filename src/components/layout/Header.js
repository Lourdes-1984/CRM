import React, {useContext} from 'react';
import { CRMContext } from '../../context/CRMContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
const [state, setState] = useContext(CRMContext);

const navigate = useNavigate();
console.log(state)
//CERRAR SESION
const cerrarSesion = ()=>{
  setState({
    token: '',
    isLogin: false
  });
  localStorage.setItem('token', '');

  //redireccionar
  navigate('/iniciar-sesion')
}

  return (
   
    <header className='barra'>
        <div className='contenedor'>
          <div className='contenido-barra'>
          {/* <i class="fa-solid fa-handshake"></i> */}
          <h1>CRM - Administrador de Clientes</h1>
            <div className='usuario'>
            <i class="fa-solid fa-circle-user"></i>
            <p >{state.nombre}</p>
            </div>
          
            {state.isLogin ? (
          <button type='button' className='btn btn-rojo'  onClick={cerrarSesion}> 
        <i className='far fa-times-circle'></i>
          Cerrar Sesión
        </button>
        
      ): null}

          </div>
            
        </div>
    </header>
  )
}
export default Header

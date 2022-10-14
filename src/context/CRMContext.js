import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../components/config/axios';

const CRMContext = React.createContext([{}, () => {} ]);


const CRMProvider = props => {
    const navigate = useNavigate();
    //definir elñ state inicial
    const [state, setState] = useState({
        nombre :'',
        clientes:[],
        productos:[],
        pedidos: [],
        usuarios: [],
        token : '',
        isLogin: false
    });
    const obtenerClientes = async () => {
        try {
          const clientesConsulta = await clienteAxios.get("/clientes", {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
          });
          //colocar el resultado en el state
          setState({
            ...state,
            clientes: clientesConsulta.data,
            isLogin: true,
          });
        } catch (error) {
          //Error con autorizacion
           if(error.response.status === 500) {
            navigate("/iniciar-sesion");
       }
        }
      }
   
   
    return(
        <CRMContext.Provider value ={[state,setState,obtenerClientes]}>
            {props.children}
        </CRMContext.Provider>
    );
}


export {CRMContext , CRMProvider}
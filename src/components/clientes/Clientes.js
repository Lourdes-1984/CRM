/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect } from "react";
import clienteAxios from "../config/axios.js";
import Cliente from "./Cliente";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

function Clientes() {
  const navigate = useNavigate();
  //utilizar valores del context
  const [ state, setState ] = useContext(CRMContext);
const {clientes} = state;
  useEffect(() => {
    if(state.token !== "") {
      //query a la api
      const consultarAPI = async () => {
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
      consultarAPI();
    } else {
      //redireccionar
      setTimeout(() => {
        //REDIRECCIONAR
        navigate("/iniciar-sesion");
      }, 1000);
    }
  }, []);

  // Si el state esta como false
  if (!state.isLogin) {
    navigate("/iniciar-sesion");
  }
  //spinner de carga
  
  //if (!clientes.length) return <p> NO hay clientes</p>;
  return (
    <Fragment>
      <h2> Clientes</h2>
      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      <ul className="listado-clientes">
        {clientes &&
          clientes.map((cliente) => (
            <Cliente key={cliente._id} cliente={cliente} />
          ))}
      </ul>
    </Fragment>
  );
}
export default Clientes;

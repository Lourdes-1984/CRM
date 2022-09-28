import React, { Fragment, useEffect, useState, useContext } from "react";
//importar cliente axios
import clienteAxios from "../config/axios";
import { Link } from "react-router-dom";
import Producto from "./Producto";
import Spinner from "../layout/Spinner";
import { useNavigate } from "react-router-dom";

//importar en Context
import { CRMContext } from "../../context/CRMContext";

function Productos() {
  const navigate = useNavigate();

  //trabajar con el  state
  //productos = state , guardarProductos = funcion para guardar el state
  const [productos, guardarProductos] = useState([]);

  //utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);

  //useEffect para consultar la API cuando cargue
  useEffect(() => {
    if (auth.token !== "") {
      //query a la api
      const consultarAPI = async () => {
        try {
          const productosConsulta = await clienteAxios.get("/productos", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            }
          });
          guardarProductos(productosConsulta.data);
        } catch (error) {
          //Error con autorizacion
          if ((error.response.status = 500)) {
            navigate("/iniciar-sesion");
          }
        }
      }//llamar a la api
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
  if (!auth.auth) {
    navigate("/iniciar-sesion");
  }

  //spinner de carga
  // if(!productos.length) return <Spinner/>
  return (
    <Fragment>
      <h2>Productos</h2>
      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>
      <ul className="listado-productos">
        {productos.map((producto) => (
          <Producto key={producto._id} producto={producto} />
        ))}
      </ul>
    </Fragment>
  );
}
export default Productos;

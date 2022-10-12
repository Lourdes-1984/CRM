import React, { Fragment, useEffect,  useContext } from "react";
import clienteAxios from "../config/axios";
import { Link } from "react-router-dom";
import Producto from "./Producto";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

function Productos() {
  const navigate = useNavigate();

  //trabajar con el  state

  //utilizar valores del context
  const [state,setState] = useContext(CRMContext);
  const {productos}=state
  //useEffect para consultar la API cuando cargue
  useEffect(() => {
    if (state.token !== "") {
      //query a la api
      const consultarAPI = async () => {
        try {
          const productosConsulta = await clienteAxios.get("/productos", {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });
          setState({
            ...state, 
            productos: productosConsulta.data
          });
        } catch (error) {
          //Error con autorizacion
          if (error.response.status === 500) {
            navigate("/iniciar-sesion");
          }
        }
      }; //llamar a la api
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
  // if(!productos.length) return <Spinner/>
  return (
    <Fragment>
      <h2>Productos</h2>
      <Link to={"/productos/nuevo"} className="btn btn-verde ">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>
      <section className="container-producto">
        {productos?.map((producto) => (
          <Producto key={producto._id} producto={producto} />
        ))}
      </section>
    </Fragment>
  );
}
export default Productos;

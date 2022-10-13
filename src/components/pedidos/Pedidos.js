import React, { useEffect, Fragment } from "react";
import { useContext } from "react";
import { CRMContext } from "../../context/CRMContext";
import clienteAxios from "../config/axios";
import DetallePedido from "./DetallePedido";

function Pedidos() {
  const [state, setState] = useContext(CRMContext);
  const {pedidos} = state;
  useEffect(() => {
    const consultarAPI = async () => {
      //obtener los pedidos
      const resultado = await clienteAxios.get("/pedidos");
      setState({
        ...state,
        pedidos: resultado.data
      });
    };
    consultarAPI();
  }, []); 

  return (
    <Fragment>
      <h2>Pedidos</h2>
      <section className="container-pedido">  
        {pedidos.length ? pedidos.map((pedido) => {
          // console.log(pedido);
          return(
            <DetallePedido key={pedido._id} {...pedido} idPedido={pedido && pedido._id}/>
          )
        }) : <p>No hay pedidos</p>}
      </section>
    </Fragment>
  );
}

export default Pedidos;

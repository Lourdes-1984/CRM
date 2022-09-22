import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../config/axios";
import DetallePedido from "./DetallePedido";

function Pedidos() {
  const [pedidos, guardarPedido] = useState([]);
  useEffect(() => {
    const consultarAPI = async () => {
      //obtener los pedidos
      const resultado = await clienteAxios.get("/pedidos");
      guardarPedido(resultado.data);
    };
    //llamar a la api
    consultarAPI();
  }, []); 

  return (
    <Fragment>
      <h2>Pedidos</h2>
      <ul className="listado-pedidos">  
        {pedidos.map((pedido) => (
          <DetallePedido key={pedido._id} {...pedido} />
        ))}
      </ul>
    </Fragment>
  );
}

export default Pedidos;

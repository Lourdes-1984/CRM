import React, {useContext}from "react";
import { Link } from "react-router-dom";
import { CRMContext } from '../../context/CRMContext';


export const NavBar = () => {
  const [state] = useContext(CRMContext);
  if(!state.isLogin) return null;
  return (
    <aside className="sidebar col-3">
      <h2>Administración</h2>
      <nav className="navegacion">
        <Link to={"/"} className="clientes">
          Clientes
        </Link>
        <Link to={"/productos"} className="productos">
          Productos
        </Link>
        <Link to={"/pedidos"} className="pedidos">
         Pedidos
        </Link>
        <Link to={"/crear-cuenta"} className="usuarios">
         Registrar Usuario
        </Link>
      </nav>
    </aside>
  );
};

export default NavBar;

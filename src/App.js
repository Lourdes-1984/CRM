import React from "react";
/**ROUTING */
import { BrowserRouter, Routes, Route, } from "react-router-dom";
/** LAYOUT */
import Header from "./components/layout/Header";
import NavBar from "./components/layout/NavBar";
/**COMPONENTES */
//CLIENTES
import Clientes from "./components/clientes/Clientes";
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';
//PRODUCTOS
import Productos from "./components/productos/Productos";
import EditarProducto from "./components/productos/EditarProducto";
import NuevoProducto from "./components/productos/NuevoProducto";
//PEDIDOS
import Pedidos from "./components/pedidos/Pedidos";
import NuevoPedido from "./components/pedidos/NuevoPedido";
//LOGIN
import Login  from "./components/auth/Login"


function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <div className="grid contenedor contenido-principal">
          <NavBar />
          <main className="caja-contenido col-9">
            <Routes>
              <Route exact path="/" element={<Clientes />} />
              <Route exact path="/clientes/nuevo" element={<NuevoCliente />} />
              <Route exact path="/clientes/editar/:id" element={<EditarCliente />} />

                <Route exact path="productos" element={<Productos />} />
                <Route exact path="/productos/nuevo" element={<NuevoProducto />} />
                <Route exact path="/productos/editar/:id" element={<EditarProducto/>} />

                <Route exact path="pedidos" element={<Pedidos />} />
                <Route exact path="/pedidos/nuevo/:id" element={<NuevoPedido/>} />

                <Route exact path="/iniciar-sesion" element={<Login/>}/>

            </Routes>
          </main>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;

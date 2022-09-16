import React from "react";
/**ROUTING */
import { BrowserRouter, Routes, Route,} from "react-router-dom";
/** LAYOUT */
import Header from "./components/layout/Header";
import NavBar from "./components/layout/NavBar";
/**COMPONENTES */
import Clientes from "./components/clientes/Clientes";
import Pedidos from "./components/pedidos/Pedidos";
import Productos from "./components/productos/Productos";

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
                <Route exact path="productos" element={<Productos />} />
                <Route exact path="pedidos" element={<Pedidos />} />
            </Routes>
          </main>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;

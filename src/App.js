import React, { Fragment } from "react";
/**ROUTING */

/** LAYOUT */
import Header from "./components/layout/Header";
import NavBar from "./components/layout/NavBar";
/**COMPONENTES */
import Clientes from "./components/clientes/Clientes";
import Pedidos from "./components/pedidos/Pedidos";
import Productos from "./components/productos/Productos";

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div class="grid contenedor contenido-principal">
          <NavBar />
          <main class="caja-contenido col-9">
            <Switch>
              <Route exact path="/" component={Clientes} />
              <Route exact path="/productos" component={Productos} />
              <Route exact path="/pedidos" component={Pedidos} />
            </Switch>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;

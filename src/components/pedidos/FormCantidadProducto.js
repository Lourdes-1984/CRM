import React, { Fragment } from "react";

function FormCantidadProducto() {
  return (
      <li>
        <div class="texto-producto">
          <p class="nombre">Macbook Pro</p>
          <p class="precio">$250</p>
        </div>
        <div class="acciones">
          <div class="contenedor-cantidad">
            <i class="fas fa-minus"></i>
            <input type="text" name="cantidad" />
            <i class="fas fa-plus"></i>
          </div>
          <button type="button" class="btn btn-rojo">
            <i class="fas fa-minus-circle"></i>
            Eliminar Producto
          </button>
        </div>
      </li>
  );
}

export default FormCantidadProducto;

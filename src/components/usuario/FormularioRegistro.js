import React, { Fragment } from "react";

const FormularioRegistro = () => {
  return (
        <Fragment>
             <h2>Nuevo Usuario</h2>
    <form>
         <legend>Llena todos los campos</legend>
        <div className="campo">
        <input
     
     type="text"
     name="nombre"
     placeholder="Ingresa tu usuario "
     require
     // onChange={leerDatos}
   />
        </div>
     <div  className="campo">
     <input
       
       type="text"
       name="email"
       placeholder="Ingresa tu email "
       require
       // onChange={leerDatos}
     />
     </div>
        <div className="campo">
        <input
        
        type="text"
        name="password"
        placeholder="Ingresa tu password "
        require
        // onChange={leerDatos}
      />
        </div>
        <div className="enviar">
        <button type="submit" className="btn btn-azul">
        Registrar
      </button>
        </div>
      
    </form>
        </Fragment>
   
  );
};

export default FormularioRegistro;

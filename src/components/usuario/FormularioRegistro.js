import React, { Fragment, useState } from "react";
import { useContext } from "react";
import { CRMContext } from "../../context/CRMContext";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FormularioRegistro = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const leerDatos = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  
   
  const enviarUsuario = (e) => {
    e.preventDefault();
    const registrarUsuarios = async (datos) => {
      try {
        await clienteAxios.post("/crear-cuenta", datos);
        console.log("usuario creado", datos);
        Swal.fire("Registro Exitoso", "Has registrado un nuevo usuario", "success");
        //redireccionar
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
       catch (error) {
        console.log(error)
        if(error.response){
          Swal.fire({
              type: 'error',
              title: 'Hay un error',
              text: error.response.data.mensaje
          })
      }else{
          Swal.fire({
              type: 'error',
              title: 'Hay un error',
              text:   'Hubo un error'
          })
      }
      
  }
      }
    registrarUsuarios(usuario);
  };

  return (
    <Fragment>
      <h2>Nuevo Usuario</h2>
      <form onSubmit={enviarUsuario}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <input
            type="text"
            name="nombre"
            value={usuario.nombre}
            placeholder="Ingresa tu usuario "
            require
            onChange={leerDatos}
          />
        </div>
        <div className="campo">
          <input
            type="text"
            name="email"
            value={usuario.email}
            placeholder="Ingresa tu email "
            require
            onChange={leerDatos}
          />
        </div>
        <div className="campo">
          <input
            type="text"
            name="password"
            value={usuario.password}
            placeholder="Ingresa tu password "
            require
            onChange={leerDatos}
          />
        </div>
        <div className="enviar">
          <button type="submit" className="btn btn-azul">
            <i class="fa-solid fa-address-card"></i>
            Registrar
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default FormularioRegistro;

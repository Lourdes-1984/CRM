import React , {useEffect,useState,Fragment} from "react";
import { useParams } from 'react-router-dom';
import clienteAxios from "../config/axios";
import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from "./FormCantidadProducto";
import Swal from "sweetalert2";

function NuevoPedido(){
    //extraer el ID del cliente
    const {id} = useParams();

    //almacenar cliente en el state

    const[cliente, guardarCliente]= useState({});
    const[busqueda, guardarBusqueda]=useState('');
    const[productos, guardarProductos]=useState([]);

    useEffect(() =>{
        //obtener el cliente
        const consultarAPI = async () =>{
             //consultar la API para obtener el cliemte actual
             const resultado = await clienteAxios.get(`/clientes/${id}`)
             guardarCliente(resultado.data)
        }
        //llamar a la api
        consultarAPI()
    },[]);

        const buscarProducto = async e =>{
            e.preventDefault();
            //obtener datos de la busqueda
            const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
            //si no hay resultado una alerta , y si no agregarlo al state
            if(resultadoBusqueda.data[0]){
                let productoResultado = resultadoBusqueda.data[0];
                //agregar la llave producto
                productoResultado.producto=  resultadoBusqueda.data[0];
                productoResultado.cantidad = 0;
                //poner en el state
                guardarProductos([...productos, productoResultado]);
                console.log(productoResultado)
            }
            else{
                //no hay resultado
                Swal.fire(
                    {
                        type:'error',
                        title: 'No Resultado',
                        text: 'No hay Resultados'
                    }
                )

            }
          
        }
        //ALMACENAR BUSQUEDA EN EL STATE
        const leerDatosBusqueda = e =>{
            guardarBusqueda(e.target.value)
        }
    return(
        <Fragment>
       
     <h2>Nuevo Pedido</h2>
             <div className="ficha-cliente">
                 <h3>Datos de Cliente</h3>
                 <p>Nombre: {cliente.nombre}</p>
                 <p>Apellido: {cliente.apellido}</p>
                 <p>Empresa: {cliente.empresa}</p>
                 <p>Teléfono: {cliente.telefono}</p>
             </div>
            
        <FormBuscarProducto
        buscarProducto={buscarProducto}
        leerDatosBusqueda={leerDatosBusqueda}
        />
                 <ul className="resumen">
                    {productos.map((produto,index) => {
                        <FormCantidadProducto />
                    })}
                 </ul>
                 <div class="campo">
                    <label>Total:</label>
                    <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
                </div>
                <div class="enviar">
                    <input type="submit" class="btn btn-azul" value="Agregar Pedido"/>
                </div>
                 
     </Fragment>
     
    )
};
export default NuevoPedido;
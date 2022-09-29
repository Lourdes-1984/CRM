import React , {useEffect,useState,Fragment} from "react";
import { useParams, useNavigate} from 'react-router-dom';
import clienteAxios from "../config/axios";
import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from "./FormCantidadProducto";
import Swal from "sweetalert2";

function NuevoPedido(){
    const navigate = useNavigate();
    //extraer el ID del cliente
    const {id} = useParams();

    //almacenar cliente en el state
    const[cliente, guardarCliente]= useState({});
    const[busqueda, guardarBusqueda]=useState('');
    const[productos, guardarProductos]=useState([]);
    const[total, guardarTotal]=useState(0);

    useEffect(() =>{
        //obtener el cliente
        const consultarAPI = async () =>{
             //consultar la API para obtener el cliemte actual
             const resultado = await clienteAxios.get(`/clientes/${id}`)
             guardarCliente(resultado.data)
        }
        //llamar a la api
        consultarAPI()

        //actualizar el total
        actualizarTotal()
    });

        const buscarProducto = async e =>{
            e.preventDefault();
            //obtener datos de la busqueda
            const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
            //si no hay resultado una alerta , y si no agregarlo al state
            if(resultadoBusqueda.data[0]){
                let productoResultado = resultadoBusqueda.data[0];
                //agregar la llave producto = COPIA DE ID
                productoResultado.producto=  resultadoBusqueda.data[0]._id;
                productoResultado.cantidad = 0;
                //poner en el state
                guardarProductos([...productos, productoResultado]);
            
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
        };

        //ACTUALIZAR LA CANTIDAD DE LOS PRODUCTOS
        const restarProducto = i => {
            //copiar el arreglo original de productos
            const todosLosProductos = [...productos]
            //validar si esta en 0 o no puede ir mas alla
            if(todosLosProductos[i].cantidad === 0)return;
            //decremento
            todosLosProductos[i].cantidad--;
            //almacenarlo en el state
            guardarProductos(todosLosProductos);
        };
        const aumentarProducto = i =>{
            //copiar el arreglo original de productos
            const todosLosProductos = [...productos]
            //incremento
            todosLosProductos[i].cantidad++;
             //almacenarlo en el state
           guardarProductos(todosLosProductos);
       };

            //ELIMINAR PRODUCTO DEL STATE
        const eliminarProductoPedido= id =>{
            const  todosLosProductos = productos.filter(producto => producto.producto !== id)
            guardarProductos(todosLosProductos)
        }
       
        //ACTUALIZAR  EL TOTAL A PAGAR
        const actualizarTotal = ()=>{
            //si el arreglo de productos es igual a 0: es total es 0 
            if(productos.length === 0){
                guardarTotal(0);
                return;
            }
            //calcular el nuevo total 
            let nuevoTotal = 0;

            //recorrer todos ls productos  sus cantidades y precios
            productos.map(producto => nuevoTotal +=(producto.cantidad * producto.precio))
            
            //almacenar el total
            guardarTotal(nuevoTotal);
        };
        //ALMACENAR EL PEDIDO EN LA BASE DE DATOS
        const RealizarPedido = async e => {
            e.preventDefault();
            //extraer el ID
            //const {id} = useParams();

            //construir el objeto
            const pedido ={
                'cliente':id,
                'pedido': productos,
                'total': total
            }
           //ALMACENAR EN BD
           const resultado = await clienteAxios.post(`/pedidos/nuevo/${id} `,pedido)
            
           //leer resultados 
           if (resultado.status === 200 ){
            //alerta todo bien 
            Swal.fire({
                type:'success',
                title: 'Correcto',
                text: resultado.data.mensaje
            })
           }else{
            //alerta error
            Swal.fire({
                type:'error',
                title: 'Hubo un error',
                text:'Vuelva a intentarlo'
            })
           }
           //redireccionar
           setTimeout(()=>{
            //REDIRECCIONAR
       navigate('/');
        },1000)
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
                    {productos.map((producto,index) =>{
                        return (
                            <FormCantidadProducto
                            key= {producto.producto}
                            producto= {producto}
                            aumentarProducto={aumentarProducto}
                            restarProducto={restarProducto}
                            eliminarProductoPedido={eliminarProductoPedido}
                            index={index}
                             />
                       )
                    } )}
                 </ul>
                <p className="total">Total a pagar: <span>${total}</span></p>
                
                {total > 0 ? (
                    <form  onSubmit={RealizarPedido}>
                        <input type='submit' className="btn btn-verde btn-block" value='Realizar Pedido' />
                    </form>
                ): 0}
     </Fragment>
    )
};
export default NuevoPedido;
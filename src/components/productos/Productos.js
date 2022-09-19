import React,{Fragment,useEffect ,useState} from 'react';
//importar cliente axios
import clienteAxios from '../config/axios'
import { Link } from 'react-router-dom';
import Producto from './Producto';
import Spinner from '../layout/Spinner'

function Productos() {
  //trabajar con el  state
    //productos = state , guardarProductos = funcion para guardar el state
  const [productos, guardarProductos] = useState([]);
  //useEffect para consultar la API cuando cargue
  useEffect(()=>{
      //query a la api
    const consultarAPI = async ()=>{
      const productosConsulta = await clienteAxios.get('/productos');
       guardarProductos(productosConsulta.data)
 } 
 //llamar a la api
 consultarAPI()
},[productos]);

//spinner de carga
if(!productos.length) return <Spinner/>
  return (
    <Fragment>
      <h2>Productos</h2>
    <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
        Nuevo Producto
    </Link>
    <ul className="listado-productos">
       {productos.map(producto =>(
        <Producto key= {producto._id} producto = {producto}/>
       ))}
    </ul>
    </Fragment>
  )
  }
export default Productos
import axios from 'axios';
import { URL_BASE } from '../../constantes';
 const clienteAxios = axios.create({
    baseURL : URL_BASE
 })




 export default clienteAxios;
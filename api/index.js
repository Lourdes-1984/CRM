const express = require('express');
const routers = require('./routers');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: '.env'});

//cors permite que un cliente se conecte a otro servidor para el interca,bio de recursos
const cors = require('cors');

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true
})

// creamos el servidor
const app = express();

// habilitar el parseo de datos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Definir un dominio(s) para reciobir peticiones
const whitelist = [process.env.FRONTEND_URL];
  const corsOptions = {
     origin: (origin , callback)=>{
        console.log(origin)
         //revisar si la peticion viene de un servisor que esta en whitelist
         const existe = whitelist.some(dominio => dominio === origin);         
          if(existe){
              callback(null ,true);
         }else{
              callback(new Error('No permitido por CORS'));
          }

      }
  }

app.use(express.json());

// habilitar cors para aceptar petidiones de otras url
app.use(cors(corsOptions));

// rutas del servidor
app.use('/', routers());

//carpeta publica
app.use(express.static('uploads'));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

//iniciar aoo
app.listen(port, host, () => {
    console.log(`servidor corriendo en el puerto: ${port}`);
})
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
    useNewUrlParser:true,
    useUnifiedTopology: true
})

// creamos el servidor
const app = express();

// habilitar el parseo de datos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
// habilitar cors para aceptar petidiones de otras url
app.use(cors());

// rutas del servidor
app.use('/', routers());

//carpeta publica
app.use(express.static('uploads'));

const port = process.env.PORT || 4000;

//iniciar aoo
app.listen(port, () => {
    console.log(`servidor corriendo en el puerto: ${port}`);
})
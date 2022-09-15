const express = require('express');
//const cors = require('cors');
const routers = require('./routers');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/crm',{
    useNewUrlParser:true
})

// creamos el servidor
const app = express();

// habilitar el pasero de datos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
// habilitar cors para aceptar petidiones de otras url

//app.use(cors());
// rutas del servidor

app.use('/', routers());
//puerto

app.listen(4000, () => {
    console.log('servidor corriendo en el puerto: 4000');
})
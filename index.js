// Creando servidor
const express = require('express')
const sequelize = require('./db/config')
const bodyParser = require('body-parser');
require('dotenv').config({path:'./.env'})
require('./db/relations');

const apiRouter = require('./routes/api')

const app = express();

// Configurar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))


// Al recibir una ruta que empiece por "/api" utilizar apiRouter
app.use('/api', apiRouter)


// Encender Servidor y sincronizar modelos de datos
app.listen(process.env.SERVER_PORT, async()=> {
    try {
        await sequelize.sync({ force: false, alter: true});
        console.log("Todos los modelos se sincronizaron correctamente");
    } catch (error) {
        console.log('Error al sincronizar modelos')
    }
})

// Creando servidor
const express = require('express')
const sequelize = require('./db/config')
const bodyParser = require('body-parser');
const cors = require('cors')

// Imagenes
const path = require('path')
const fs = require('fs')
const multer = require('multer')

// Decirle a multer dónde guardar las imagenes
const upload = multer ( {dest: 'public/images'} )

// DB/RELACIONES/VARIABLES DE ENTORNO
require('dotenv').config({path:'./.env'})
require('./db/relations');

// Rutas
const apiRouter = require('./routes/api')

const app = express();

// Recibir Json de formularios y decirle a express donde estan los archivos estaticos
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

// Permitir peticiones de manera local
app.use(cors())


// Configurar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))


// Al recibir una ruta que empiece por "/api" utilizar apiRouter
app.use('/api', apiRouter)


// Encender Servidor y sincronizar modelos de datos
const PORT = process.env.PORT || process.env.SERVER_PORT

app.listen(PORT, async()=> {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`)
    try {
        await sequelize.sync({ force: false, alter: true});
        console.log("Todos los modelos se sincronizaron correctamente");
    } catch (error) {
        console.log('Error al sincronizar modelos')
    }
})

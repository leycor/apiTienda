const router = require('express').Router();
const bcrypt = require('bcryptjs')

// Modelo
const userModel = require('../../db/models/userModel');


router.post('/register', async(req, res) =>{

    // Encriptar contraseña
    const password = req.body.password
    const email = req.body.email
    try {
        const passwordHash =  await bcrypt.hash(password.toString(), 8)
        const result = await userModel.createUser(email, passwordHash)
        
        // Mostrar error
        if( !Array.isArray(result) ) res.json( result)
        
        res.json(result)
    } catch (error) {
        console.log('Ocurrio un error')
    }

})


router.post('/login', async(req, res) => {
    const password = req.body.password
    const email = req.body.email
    const result = await userModel.getEmail(email)

    if(!result) res.json('Datos incorrectos')

    try {
        const passOkey = await bcrypt.compare(password.toString(), result.password)
        if(!passOkey) res.json('Datos incorrectos')
        res.json(result)
    } catch (error) {
        console.log(error)
    }

})


// http://localhost:3000/api/users
router.get('/', async(req, res)=> {
    const result = await userModel.getAllUsers()
    res.json(result)
})


module.exports = router;
const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jwt-simple')
const moment = require('moment')

// Modelo
const userModel = require('../../db/models/userModel');

// http://localhost:3000/api/users
router.get('/', async(req, res)=> {
    const result = await userModel.getAllUsers()
    res.json(result)
})


router.post('/register', async(req, res) =>{

    // Encriptar contraseña
    const password = req.body.password
    const email = req.body.email
    try {
        const passwordHash =  await bcrypt.hash(password.toString(), 8)
        const result = await userModel.createUser(email, passwordHash)
        
        // Mostrar error
        res.json({
            error: !Array.isArray(result) && typeof(result) !== 'string' ? false : true,
            data: result
        })
    } catch (error) {
        console.log('Ocurrio un error al cargar el usuario', error)
    }

})


router.post('/login', async(req, res) => {
    const password = req.body.password
    const email = req.body.email
    const result = await userModel.getEmail(email)

    // Responder con un error si el email no existe
    if(!result) res.json({error: true, data: 'Password o email incorrectos'})

    try {
        const passOkey = await bcrypt.compare(password.toString(), result.password)

        // Comparar si la password coincide con el hash de la base de datos
        if(!passOkey) res.json({error: true, data: 'Password o email incorrecto'})

        // Si las password coinciden enviar token
        res.json({error: false, data: createToken(result)})
    } catch (error) {
        console.log(error)
    }

})

const createToken = (user) => {
    const payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5,'minutes').unix()
    }

    return jwt.encode(payload, 'secred words')
}


module.exports = router;
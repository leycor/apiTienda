const { DataTypes } = require('sequelize');
const sequelize = require('../config');

// Definición de Módelos    

const userModel = sequelize.define('user', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    password :{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
})


// Crear usuario

userModel.createUser = async function(email, password){
    try {
        const result = await userModel.create({email, password})
        return result
    } catch(error){
        const validationDb = error.errors[0].message
        if(validationDb === 'Validation notEmpty on email failed' ) return 'El email no puede estar vacio'
        if(validationDb === 'Validation isEmail on email failed' ) return 'El email no es valido'
        if(error.name === 'SequelizeUniqueConstraintError') return `El email ya se encuentra en uso`
        return error
    }
}


// Obtener todos los usuarios
userModel.getAllUsers = async function(){
    try{
        const result = await userModel.findAll();
        return result;
    } catch(error){
        return error
    }
}

// Obtener Email de usuario
userModel.getEmail = async function(email){
    try {
        const result = await userModel.findOne( { where :  {email: email} });
        return result
        
    } catch (error) {
        return error
    }
}

module.exports = userModel
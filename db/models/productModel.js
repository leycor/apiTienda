const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const categoryModel = require('./categoryModel');

// Definición de Modeo
const productModel = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },

    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate:{
            isNumeric: true, 
        }
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isNumeric: true,
            notEmpty: true,
        }
    },

    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
            isNumeric: true,
        }
    },

    file: {
        type: DataTypes.STRING,
        validate:{
            notEmpty: true
        }
    }
    
})

// Obtener todos los productos
productModel.getAllProducts = async function(){
    try{
        const result = await productModel.findAll(
            { include: {
                model: categoryModel
            }}
        );
        return result;
    } catch(error){
        return error
    }
}

// Obtener Producto por Id
productModel.getProductForId = async function(id){
    try {
        const result = await productModel.findOne({
            include: { model: categoryModel },
            where: {id: id}
        })
        return result
    } catch (error) {
        return error
    }
}

// Crear un producto
productModel.createProduct = async function(name, stock, price, categoryId,file){

    try {
        const result = await productModel.create({name, stock, price, categoryId,file})
        return result
        
    } catch (error) {

        // Gestionando errores al crear un nuevo producto ** Optimizar esto para no repetirlo ***
        const validationDb = error.errors[0].message
        if(validationDb === 'Validation notEmpty on name failed' ) return 'El nombre del producto no puede estar vacio'
        if(error.name === 'SequelizeUniqueConstraintError') return `Ya existe un producto con el nombre ${name}`
        if(validationDb === 'Validation isNumeric on stock failed' ) return 'El stock tiene que ser un valor numerico'
        if(validationDb === 'Validation isNumeric on price failed' ) return 'El precio tiene que ser un valor numerico'
        if(validationDb === 'Validation isNumeric on categoryId failed' ) return 'El campo categoria tiene que ser un valor numerico'
        return error
    }

}


// Actualizar un producto
productModel.updateProduct = async  function(id,name, stock, price, categoryId,file){
    try {
        const result = await productModel.update(
            { name, stock, price, categoryId, file }, 
            { where: {id: id} }
        )
        return result
    } catch (error) {
        return error

    }
}

// Eliminar Producto
productModel.deleteProduct = async function(id){
    try {
        const result = await productModel.destroy({where: {id : id}})
        return result
    } catch (error) {
        return error
    }
}




module.exports = productModel
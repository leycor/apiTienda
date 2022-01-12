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
productModel.createProduct = async function(name, stock, price, categoryId){

    try {
        const result = await productModel.create({name, stock, price, categoryId})
        return result
        
    } catch (error) {
        return error
    }

}


// Actualizar un producto
productModel.updateProduct = async  function(id,name, stock, price, categoryId){
    try {
        const result = await productModel.update(
            { name, stock, price, categoryId }, 
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
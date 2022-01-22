const { DataTypes } = require('sequelize');
const sequelize = require('../config');

// Definición de Módelos    

const categoryModel = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
            notEmpty: true,
            isAlpha: true,
        }
    }
})

// Obtener toda las categorias
categoryModel.getAllCategory = async function(){
    try{
        const result = await categoryModel.findAll();
        return result;
    } catch(error){
        return error
    }
}

// Obtener Categoria por ID
categoryModel.getCategoryForId = async function(id){
    try {
        const result = await categoryModel.findByPk(id)
        return result
    } catch (error) {
        return error
    }
}

// Obtener Categoria por nombre
categoryModel.getCategoryForName = async function(nameCategory){
    try {
        const result = await categoryModel.findOne( { where :  {name: nameCategory} });
        return result.total
        
    } catch (error) {
        return error
    }
}

// Crear una categoria
categoryModel.createCategory = async function(name){

    try {
        const result = await categoryModel.create({name})
        return result
        
    } catch (error) {

        // Gestionando errores al crear una nueva categoria ** Optimizar esto para no repetirlo ***
        const validationDb = error.errors[0].message
        if(error.name === 'SequelizeUniqueConstraintError') return `Ya existe una categoria con el nombre ${name}`
        if(validationDb === 'Validation notEmpty on name failed' ) return 'El nombre de la categoria no puede estar vacio'
        if(validationDb === 'Validation isAlpha on name failed' ) return 'El nombre de la categoria no puede ser un valor numerico'
        return error
    }

}


// Actualizar una categoria
categoryModel.updateCategory = async  function(id, name){
    try {
        const result = await categoryModel.update({name : name}, {where: {id: id}})
        return result

    } catch (error) {
        // Gestionando errores al crear una nueva categoria ** Optimizar esto para no repetirlo ***
        const validationDb = error.errors[0].message
        if(error.name === 'SequelizeUniqueConstraintError') return `Ya existe una categoria con el nombre ${name}`
        if(validationDb === 'Validation notEmpty on name failed' ) return 'El nombre de la categoria no puede estar vacio'
        if(validationDb === 'Validation isAlpha on name failed' ) return 'El nombre de la categoria no puede ser un valor numerico'
        return error

    }
}

// Eliminar categoria
categoryModel.deleteCategory = async function(id){
    try {
        const result = await categoryModel.destroy({where: {id : id}})
        return result
    } catch (error) {
        return error
    }
}
module.exports = categoryModel
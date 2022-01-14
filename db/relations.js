// Cargar Modelos
const categoryModel = require('./models/categoryModel');
const productModel = require('./models/productModel')
const userModel = require('./models/userModel')


// Relación de Modelos
categoryModel.hasMany(productModel);
productModel.belongsTo(categoryModel);

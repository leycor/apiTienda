// Cargar Modelos
const categoryModel = require('./models/categoryModel');
const productModel = require('./models/productModel')


// Relación de Modelos
categoryModel.hasMany(productModel);
productModel.belongsTo(categoryModel);

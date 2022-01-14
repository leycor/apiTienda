const router = require('express').Router();

const apiCategoryRouter = require('./api/category')
const apiProductRouter = require('./api/product')
const apiUserRouter = require('./api/user')

router.use('/category', apiCategoryRouter) // Enviarlo a las rutas de categoria si recibe en la url /category
router.use('/products', apiProductRouter) // Enviarlo a las rutas de productos si recibe en la url /product
router.use('/users', apiUserRouter) // Enviarlo a las rutas de productos si recibe en la url /product

module.exports = router;
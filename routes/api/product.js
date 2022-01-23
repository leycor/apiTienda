
const router = require('express').Router();
const multer = require('multer')
const fs = require('fs')

// Decirle a multer dónde guardar las imagenes
const upload = multer ( {dest: 'public/images'} )

// Import model
const productModel = require('../../db/models/productModel');


router.post('/upload', upload.single('file'), async(req, res) => {
    fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1])
    console.log(req.file)
    res.json(req.file)
})

// http://localhost:3000/api/products
router.get('/', async(req, res)=> {
    const result = await productModel.getAllProducts()
    res.json(result)
})


// http://localhost:3000/api/products/id
router.get('/:id', async(req, res)=> {
    const idProduct = Number.parseInt(req.params.id)
    const result = await productModel.getProductForId(idProduct)
    res.json(result)
})

// http://localhost:3000/api/products
router.post('/', upload.single('file'), async(req, res) => {

    // Renombrar imagenes para que tengan extension
    // fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1])
    console.log(req.file)
    console.log(req.body.name)
    console.log(req.body.price)
    console.log(req.body.stock)
    console.log(req.body.categoryId)
    res.json(req.body)

    // Data del producto
    const name = req.body.name
    const stock = Number.parseInt(req.body.stock)
    const price = Number.parseFloat(req.body.price)
    const categoryId = Number.parseInt(req.body.categoryId)
    const file = req.file.path

    const result = await productModel.createProduct(name, stock, price, categoryId, file)

    // Mostrar error
    res.json({
        error: !Array.isArray(result) && typeof(result) !== 'string' ? false : true,
        data: result
    })
    
})

// http://localhost:3000/api/products/id
router.put('/:id', async(req, res) => {
    const id = Number.parseInt(req.params.id)
    const name = req.body.name
    const stock = Number.parseInt(req.body.stock)
    const price = Number.parseFloat(req.body.price)
    const categoryId = Number.parseInt(req.body.categoryId)

    const result = await productModel.updateProduct(id, name, stock, price, categoryId)

    // Mostrar error
    if( !Array.isArray(result) ) res.json( result)

    // Actualización exitosa
    res.json(`Producto actualizado correctamente`)
})


// http://localhost:3000/api/products/id
router.delete('/:id', async(req, res) => {
    const id = Number.parseInt(req.params.id)
     const result = await productModel.deleteProduct(id)
     res.json(`El producto ${id} ha sido eliminado correctamente`)
})
module.exports = router;
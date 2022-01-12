const router = require('express').Router();

// Import model
const categoryModel = require('../../db/models/categoryModel')

// http://localhost:3000/api/category
router.get('/', async (req, res) => {
    const result = await categoryModel.getAllCategory()
    res.json(result)
})

// http://localhost:3000/api/category/id
router.get('/:id', async(req, res) => {
    const idCategory = Number.parseInt(req.params.id)
    const result = await categoryModel.getCategoryForId(idCategory)
    if(result == null) res.json('La categoria no existe')
    res.json(result)
})

// http://localhost:3000/api/category
router.post('/', async(req, res) => {
    const nameCategory = req.body.name

    const result = await categoryModel.createCategory(req.body.name)

    // Mostrar error
    if( !Array.isArray(result) ) res.json( result)

    res.json(result)
})

// http://localhost:3000/api/category/id
router.put('/:id', async(req, res) => {
    const idCategory = Number.parseInt(req.params.id)
    const nameCategory = req.body.name

    const result = await categoryModel.updateCategory(idCategory, nameCategory)

    // Mostrar error
    if( !Array.isArray(result) ) res.json( result)

    // Actualización exitosa
    res.json(`Categoria actualizada correctamente`)
})

// http://localhost:3000/api/category/id
router.delete('/:id', async(req, res) => {
    const idCategory = Number.parseInt(req.params.id)
     const result = await categoryModel.deleteCategory(idCategory)
     res.json(`La categoria ${idCategory} ha sido eliminada correctamente`)
})
module.exports = router;
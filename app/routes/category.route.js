const express = require('express')
const { categoryController } = require('../controllers')

const categoryRouter = express.Router()

categoryRouter.get('/', categoryController.getCategoriesList)
categoryRouter.get('/:categoryId', categoryController.getCategoryById)

module.exports = { categoryRouter }

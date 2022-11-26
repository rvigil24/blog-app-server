const { category: categoryService } = require('../services')

const getCategoriesList = async (req, res, next) => {
    try {
        const categories = await categoryService.list()
        return res.status(200).json({
            data: categories,
        })
    } catch (ex) {
        next(ex)
    }
}

const getCategoryById = async (req, res, next) => {
    const { categoryId } = req.params
    try {
        const category = await categoryService.get(categoryId)
        return res.status(200).json({
            data: category,
        })
    } catch (ex) {
        next(ex)
    }
}

module.exports = {
    getCategoriesList,
    getCategoryById,
}

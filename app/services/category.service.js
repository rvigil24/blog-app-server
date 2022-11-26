const { Category } = require('../models')

const list = async () => {
    try {
        const categories = await Category.findAll()
        return categories
    } catch (ex) {
        throw ex
    }
}

const get = async (categoryId) => {
    try {
        const category = await Category.findByPk(categoryId)
        return category
    } catch (ex) {
        throw ex
    }
}

module.exports = {
    list,
    get,
}

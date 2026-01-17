const Category = require("../model/category");

class CategoryService {
    constructor(){
        this._model = Category
    }

    async addCategory({ name, price, description }){
        const category = await this._model.create({ name, price, description })

        return category
    }

    async getCategoryById(id){
        const category = await this._model.findById(id)

        if (!category){
            throw new Error("Category not found")
        }

        return category
    }

    async getCategories(){
        const categories = await this._model.find()

        return categories
    }

    async deleteCategoryById(id){
        const order = await this._model.deleteOne({ _id: id })

        if (order.deletedCount == 0){
            throw new Error("Category not found")
        }
    }
}

const categoryService = new CategoryService()

module.exports = categoryService
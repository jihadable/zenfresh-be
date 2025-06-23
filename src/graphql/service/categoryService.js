const Category = require("../../model/category");

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
            throw new Error("Kategori tidak ditemukan")
        }

        return category
    }

    async getCategories(){
        const categories = await this._model.find()

        return categories
    }

    async deleteCategoryById(id){
        await this.getCategoryById(id)
        const category = await this._model.deleteOne({ _id: id })
    }
}

const categoryService = new CategoryService()

module.exports = categoryService
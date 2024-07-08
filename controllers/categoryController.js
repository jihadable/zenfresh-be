const { Category } = require("../models/categoryModel")
const defaultResponse = require("../utils/defaultResponse")
const serverErrorResponse = require("../utils/serverErrorResponse")

// get all categories
const getAllCategories = async(req, res) => {
    try {
        const categories = await Category.find().sort({ price: 1 })

        return res.status(200).json({
            ...defaultResponse(200, true, "Get all categories successfully"),
            categories: categories.map(category => category.response())
        })
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

module.exports = { getAllCategories }
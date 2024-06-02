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

const storeCategory = async(req, res) => {
    try {
        await Category.create({ ...req.body })

        return res.status(201).json(defaultResponse(201, true, "Created category successfully"))
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

const deleteCategory = async(req, res) => {
    try {
        const { id } = req.params

        const deletedCategory = await Category.findByIdAndDelete(id)

        if (!deletedCategory){
            return res.status(404).json(defaultResponse(404, false, "No category found with the provided ID"))
        }

        return res.status(200).json(defaultResponse(200, true, "Delete category successfully"))
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

const updateCategory = async(req, res) => {
    try {
        const { id } = req.params

        const updatedCategory = await Category.findByIdAndUpdate(id, { ...req.body })

        if (!updatedCategory){
            return res.status(404).json(defaultResponse(404, false, "No category found with the provided ID"))
        }

        return res.status(200).json(defaultResponse(200, true, "Update category successfully"))
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

module.exports = { getAllCategories, storeCategory, deleteCategory, updateCategory }
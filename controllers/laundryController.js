const { Laundry } = require("../models/laundryModel")
const defaultResponse = require("../utils/defaultResponse")
const serverErrorResponse = require("../utils/serverErrorResponse")

// get all laundries
const getAllLaundries = async (req, res) => {
    try {
        const laundries = await Laundry.find().populate("user")

        return res.status(200).json({
            ...defaultResponse(200, true, "Get all laundries successfully"),
            laundries: laundries.map(laundry => laundry.response())
        })
    } catch (error){
        serverErrorResponse(error, res)
    }
}

// post a laundry
const storeLaundry = async (req, res) => {
    try {
        const { user_id } = req.body
        await Laundry.create({ ...req.body, user: user_id })

        return res.status(201).json(defaultResponse(201, true, "Laundry created successfully"))
    } catch (error){
        serverErrorResponse(error, res)
    }
}

// delete single laundry
const deleteSingleLaundry = async (req, res) => {
    try {
        const { id } = req.params

        const deletedLaundry = await Laundry.findByIdAndDelete(id)

        if (!deletedLaundry){
            return res.status(404).json(defaultResponse(404, false, "No laundry found with the provided ID"))
        }

        return res.status(200).json(defaultResponse(200, true, "Laundry deleted successfully"))
    } catch (error){
        serverErrorResponse(error, res)
    }
}

// delete multiple laundries
const deleteMultipleLaundry = async (req, res) => {
    try {
        const { ids } = req.body

        const deletedLaundry = await Laundry.deleteMany({ _id: { $in: ids }})

        if (deletedLaundry.deletedCount === 0){
            return res.status(404).json(defaultResponse(404, false, "No laundries found with the provided IDs"))
        }

        return res.status(200).json(defaultResponse(200, true, "Laundries deleted successfully"))
    } catch (error){
        serverErrorResponse(error, res)
    } 
}

// update a laundry
const updateLaundry = async (req, res) => {
    try {
        const { id } = req.params
    
        const updatedLaundry = await Laundry.findByIdAndUpdate(id, { ...req.body }).populate("user")

        if (!updatedLaundry){
            return res.status(404).json(defaultResponse(404, false, "No laundry found with the provided ID"))
        }

        return res.status(200).json(defaultResponse(200, true, "Laundry updated successfully"))
    } catch (error){
        serverErrorResponse(error, res)
    }
}

module.exports = { getAllLaundries, storeLaundry, deleteSingleLaundry, deleteMultipleLaundry, updateLaundry }
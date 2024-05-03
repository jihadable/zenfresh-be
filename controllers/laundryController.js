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

// get all laundries by user
const getAllLaundriesByUser = async (req, res) => {
    try {
        const { user_id } = req.body

        const laundries = await Laundry.find({ user: user_id }).populate("user")

        return res.status(200).json({
            ...defaultResponse(200, true, "Get all laundries by user successfully"),
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
        const laundry = await Laundry.create({ ...req.body, user: user_id })

        await laundry.populate("user")

        return res.status(201).json({
            ...defaultResponse(201, true, "Laundry created successfully"),
            laundry: laundry.response()
        })
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
    
        const updatedLaundry = await Laundry.findByIdAndUpdate(id, { ...req.body }, { new: true }).populate("user")

        if (!updatedLaundry){
            return res.status(404).json(defaultResponse(404, false, "No laundry found with the provided ID"))
        }

        return res.status(200).json({
            ...defaultResponse(200, true, "Laundry updated successfully"),
            laundry: updatedLaundry.response()
        })
    } catch (error){
        serverErrorResponse(error, res)
    }
}

module.exports = { getAllLaundries, getAllLaundriesByUser, storeLaundry, deleteSingleLaundry, deleteMultipleLaundry, updateLaundry }
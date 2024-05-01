const { Laundry } = require("../models/laundryModel")
const errorResponse = require("../utils/errorResponse")

// get all laundries
const getAllLaundries = async (req, res) => {
    
}

// get a single laundry
const getSingleLaundry = async (req, res) => {
    
}

// post a laundry
const storeLaundry = async (req, res) => {
    try {
        const { user_id } = req.body
        const laundry = await Laundry.create({ ...req.body, user: user_id })

        await laundry.populate("user")

        return res.status(201).json({
            status: 201,
            message: "Laundry created successfully",
            laundry: laundry.response()
        })
    } catch (error){
        errorResponse(error, res)
    }
}

// delete single laundry
const deleteSingleLaundry = async (req, res) => {
    try {
        const { id } = req.params

        const deletedLaundry = await Laundry.findByIdAndDelete(id)

        if (!deletedLaundry){
            return res.status(404).json({
                status: 404,
                message: "No laundry found with the provided ID"
            })
        }

        return res.status(200).json({
            status: 200,
            message: "Laundry deleted successfully"
        })
    } catch (error){
        errorResponse(error, res)
    }
}

// delete multiple laundries
const deleteMultipleLaundry = async (req, res) => {
    try {
        const { ids } = req.body

        const deletedLaundry = await Laundry.deleteMany({ _id: { $in: ids }})

        if (deletedLaundry.deletedCount === 0){
            return res.status(404).json({
                status: 404,
                message: "No laundries found with the provided IDs"
            })
        }

        return res.status(200).json({
            status: 200,
            message: "Laundries deleted successfully"
        })
    } catch (error){
        errorResponse(error, res)
    } 
}

// update a laundry
const updateLaundry = async (req, res) => {
    try {
        const { id } = req.params
    
        const updatedLaundry = await Laundry.findByIdAndUpdate(id, { ...req.body }, { new: true }).populate("user")

        if (!updatedLaundry){
            return res.status(404).json({
                status: 404,
                message: "No laundry found with the provided ID"
            })
        }

        return res.status(200).json({
            status: 200,
            message: "Laundry updated successfully",
            laundry: updatedLaundry.response()
        })
    } catch (error){
        errorResponse(error, res)
    }
}

module.exports = { getAllLaundries, getSingleLaundry, storeLaundry, deleteSingleLaundry, deleteMultipleLaundry, updateLaundry }
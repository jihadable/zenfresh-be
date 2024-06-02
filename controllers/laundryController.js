const { Laundry } = require("../models/laundryModel")
const defaultResponse = require("../utils/defaultResponse")
const serverErrorResponse = require("../utils/serverErrorResponse")

// post a laundry
const storeLaundry = async (req, res) => {
    try {
        const { user_id } = req.body
        await Laundry.create({ ...req.body, user: user_id })

        return res.status(201).json(defaultResponse(201, true, "Laundry created successfully"))
    } catch (error){
        return serverErrorResponse(error, res)
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
        return serverErrorResponse(error, res)
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
        return serverErrorResponse(error, res)
    }
}

module.exports = { storeLaundry, deleteSingleLaundry, updateLaundry }
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
        const laundry = await (await Laundry.create({ ...req.body, user: user_id })).populate("user")

        return res.status(201).json({
            status: 201,
            message: "Laundry created",
            laundry: laundry.response()
        })
    } catch (error){
        errorResponse(error, res)
    }
}

// delete a laundry
const deleteLaundry = async (req, res) => {

}

// update a laundry
const updateLaundry = async (req, res) => {
    try {
        const { id } = req.params
    
        const laundry = await Laundry.findByIdAndUpdate(id, { ...req.body }, { new: true }).populate("user")

        return res.status(200).json({
            status: 200,
            message: "Laundry updated",
            laundry: laundry.response()
        })
    } catch (error){
        errorResponse(error, res)
    }
}

module.exports = { getAllLaundries, getSingleLaundry, storeLaundry, deleteLaundry, updateLaundry }
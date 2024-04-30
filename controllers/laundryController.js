const { Laundry } = require("../models/laundryModel")
const { User } = require("../models/userModel")

// get all laundries
const getAllLaundries = async (req, res) => {

}

// get a single laundry
const getSingleLaundry = async (req, res) => {

}

// post a laundry
const storeLaundry = async (req, res) => {
    try {
        const laundry = await Laundry.create({ ...req.body })
        const user = await User.findById(req.body.user_id)

        return res.status(201).json({
            status: 201,
            message: "Laundry created",
            laundry: {
                type: laundry.type,
                user: {
                    fullname: user.fullname
                }
            }
        })
    } catch (error){
        console.log(error.message)

        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

// delete a laundry
const deleteLaundry = async (req, res) => {

}

// update a laundry
const updateLaundry = async (req, res) => {

}

module.exports = { getAllLaundries, getSingleLaundry, storeLaundry, deleteLaundry, updateLaundry }
const Joi = require("joi")
const { Laundry } = require("../models/laundryModel")
const { User } = require("../models/userModel")
const defaultResponse = require("../utils/defaultResponse")
const serverErrorResponse = require("../utils/serverErrorResponse")

// store laundry
const storeLaundry = async(req, res) => {
    const storeLaundrySchema = Joi.object({
        category: Joi.string().required(),
        date: Joi.date().required(),
        is_paid: Joi.boolean().valid(false).required(),
        status: Joi.string().valid("Menunggu konfirmasi").required(),
        user_id: Joi.string().required()
    })

    const { error } = storeLaundrySchema.validate(req.body)

    if (error){
        return res.status(400).json(defaultResponse(400, false, error.details[0].message))
    }

    try {
        const { user_id } = req.body

        const { _id } = await Laundry.create({ ...req.body, user: user_id })
        const laundry = await Laundry.findById(_id).populate("user").populate("category")

        return res.status(201).json({
            ...defaultResponse(201, true, "Berhasil membuat pesanan baru"),
            laundry: laundry.response()
        })
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

// get all laundries
const getAllLaundries = async(req, res) => {
    try {
        const { user_id } = req.body
        const { role } = await User.findById(user_id)

        let laundries

        if (role === "admin"){
            laundries = await Laundry.find().sort({ createdAt: -1 }).populate("user").populate("category")
        }
        else {
            laundries = await Laundry.find({ user: user_id }).sort({ createdAt: -1 }).populate("user").populate("category")
        }

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil mendapatkan semua pesanan"),
            laundries: laundries.map(laundry => laundry.response())
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

// delete single laundry
const deleteSingleLaundry = async(req, res) => {
    try {
        const { id } = req.params
        const deletedLaundry = await Laundry.findByIdAndDelete(id)

        if (!deletedLaundry){
            return res.status(404).json(defaultResponse(404, false, "Pesanan tidak ditemukan"))
        }

        return res.status(200).json(defaultResponse(200, true, "Berhasil menghapus pesanan"))
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

// update laundry
const updateLaundry = async(req, res) => {
    const updateLaundrySchema = Joi.object({
        category: Joi.string(),
        status: Joi.string(),
        weight: Joi.number(),
        rate: Joi.number(),
        user_id: Joi.string()
    })

    const { error } = updateLaundrySchema.validate(req.body)

    if (error){
        return res.status(400).json(defaultResponse(400, false, error.details[0].message))
    }

    try {
        const { id } = req.params
        const updatedLaundry = await Laundry.findByIdAndUpdate(id, { ...req.body }, { new: true }).populate("user").populate("category")

        if (!updatedLaundry){
            return res.status(404).json(defaultResponse(404, false, "Pesanan tidak ditemukan"))
        }

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil memperbarui data pesanan"),
            laundry: updatedLaundry.response()
        })
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

module.exports = { storeLaundry, getAllLaundries, deleteSingleLaundry, updateLaundry }
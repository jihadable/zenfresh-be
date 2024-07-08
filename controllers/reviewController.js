const Joi = require("joi")
const { Review } = require("../models/reviewModel")
const defaultResponse = require("../utils/defaultResponse")
const serverErrorResponse = require("../utils/serverErrorResponse")

// get all reviews
const getAllReviews = async(req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }).populate("user")

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil mendapatkan semua ulasan"),
            reviews: reviews.map(review => review.response())
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

// store review
const storeReview = async(req, res) => {
    const storeReviewSchema = Joi.object({
        user_id: Joi.string().required(),
        content: Joi.string().required(),
        rate: Joi.number().min(1).max(5).required(),
        date: Joi.date().required()
    })

    const { error } = storeReviewSchema.validate(req.body)

    if (error){
        return res.status(400).json(defaultResponse(400, false, error.details[0].message))
    }

    try {
        const { user_id } = req.body
        await Review.create({ ...req.body, user: user_id })

        return res.status(201).json(defaultResponse(201, true, "Berhasil membuat ulasan baru"))
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

module.exports = { getAllReviews, storeReview }
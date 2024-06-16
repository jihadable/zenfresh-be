const { Review } = require("../models/reviewModel")
const defaultResponse = require("../utils/defaultResponse")
const serverErrorResponse = require("../utils/serverErrorResponse")

// get all reviews
const getAllReviews = async(req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }).populate("user")

        return res.status(200).json({
            ...defaultResponse(200, true, "Get all reviews successfully"),
            reviews: reviews.map(review => review.response())
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

// store review
const storeReview = async(req, res) => {
    try {
        const { user_id } = req.body
        await Review.create({ ...req.body, user: user_id })

        return res.status(201).json(defaultResponse(201, true, "Review stored successfully"))
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

module.exports = { getAllReviews, storeReview }
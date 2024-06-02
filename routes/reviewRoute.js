const { Router } = require("express")
const { storeReview, getAllReviews } = require("../controllers/reviewController")

const reviewRouter = Router()

// get all reviews
reviewRouter.get("/", getAllReviews)

// store review
reviewRouter.post("/", storeReview)

module.exports = reviewRouter
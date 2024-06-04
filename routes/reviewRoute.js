const { Router } = require("express")
const { storeReview, getAllReviews } = require("../controllers/reviewController")
const { verifyToken } = require("../middlewares/authMiddleware")

const reviewRouter = Router()

// get all reviews
reviewRouter.get("/", getAllReviews)

// store review
reviewRouter.post("/", verifyToken, storeReview)

module.exports = reviewRouter
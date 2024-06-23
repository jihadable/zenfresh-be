const { Router } = require("express")
const { storeReview, getAllReviews } = require("../controllers/reviewController")
const { verifyToken } = require("../middlewares/authMiddleware")

const reviewRouter = Router()

reviewRouter.use(verifyToken)

// get all reviews
reviewRouter.get("/", getAllReviews)

// store review
reviewRouter.post("/", storeReview)

module.exports = reviewRouter
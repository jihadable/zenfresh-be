const { Router } = require("express")
const { getAllLaundries, getSingleLaundry, storeLaundry, deleteLaundry, updateLaundry } = require("../controllers/laundryController")
const { extractUserId } = require("../middlewares/authMiddleware")
const idValidation = require("../middlewares/idValidationMiddleware")

const laundryRouter = Router()

// get all laundries
laundryRouter.get("/", getAllLaundries)

// get single laundry
laundryRouter.get("/:id", getSingleLaundry)

// post a laundry
laundryRouter.post("/", extractUserId, storeLaundry)

// delete a laundry
laundryRouter.delete("/:id", deleteLaundry)

// update a laundry
laundryRouter.patch("/:id", extractUserId, idValidation, updateLaundry)

module.exports = laundryRouter
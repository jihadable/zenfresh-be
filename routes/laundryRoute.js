const { Router } = require("express")
const { getAllLaundries, storeLaundry, deleteSingleLaundry, deleteMultipleLaundry, updateLaundry } = require("../controllers/laundryController")
const { verifyToken } = require("../middlewares/authMiddleware")
const idValidation = require("../middlewares/idValidationMiddleware")

const laundryRouter = Router()

laundryRouter.use(verifyToken)

// get all laundries
laundryRouter.get("/", getAllLaundries)

// post a laundry
laundryRouter.post("/", storeLaundry)

// delete a laundry
laundryRouter.delete("/:id", idValidation, deleteSingleLaundry)

// delete multiple laundries
laundryRouter.delete("/", deleteMultipleLaundry)

// update a laundry
laundryRouter.patch("/:id", idValidation, updateLaundry)

module.exports = laundryRouter
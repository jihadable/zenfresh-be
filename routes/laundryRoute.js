const { Router } = require("express")
const { storeLaundry, deleteSingleLaundry, updateLaundry, getAllLaundries } = require("../controllers/laundryController")
const { verifyToken } = require("../middlewares/authMiddleware")
const idValidation = require("../middlewares/idValidationMiddleware")

const laundryRouter = Router()

laundryRouter.use(verifyToken)

// post a laundry
laundryRouter.post("/", storeLaundry)

// get all laundries
laundryRouter.get("/", getAllLaundries)

// delete a laundry
laundryRouter.delete("/:id", idValidation, deleteSingleLaundry)

// update a laundry
laundryRouter.patch("/:id", idValidation, updateLaundry)

module.exports = laundryRouter
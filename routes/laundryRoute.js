const { Router } = require("express")
const { 
    getAllLaundries, 
    getAllLaundriesByUser, 
    storeLaundry, 
    deleteSingleLaundry, 
    deleteMultipleLaundry,
    updateLaundry
} = require("../controllers/laundryController")
const { extractUserId } = require("../middlewares/authMiddleware")
const idValidation = require("../middlewares/idValidationMiddleware")

const laundryRouter = Router()

laundryRouter.use(extractUserId)

// get all laundries
laundryRouter.get("/", getAllLaundries)

// get all laundries by user
laundryRouter.get("/byuser", getAllLaundriesByUser)

// post a laundry
laundryRouter.post("/", storeLaundry)

// delete a laundry
laundryRouter.delete("/:id", idValidation, deleteSingleLaundry)

// delete multiple laundries
laundryRouter.delete("/", deleteMultipleLaundry)

// update a laundry
laundryRouter.patch("/:id", idValidation, updateLaundry)

module.exports = laundryRouter
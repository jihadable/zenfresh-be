const { Router } = require("express")
const { getAllCategories } = require("../controllers/categoryController")

const categoryRouter = Router()

// get all categories
categoryRouter.get("/", getAllCategories)

module.exports = categoryRouter
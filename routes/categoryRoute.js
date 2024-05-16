const { Router } = require("express")
const { getAllCategories, storeCategory, deleteCategory, updateCategory } = require("../controllers/categoryController")
const { verifyToken } = require("../middlewares/authMiddleware")
const idValidation = require("../middlewares/idValidationMiddleware")

const categoryRouter = Router()

// get all categories
categoryRouter.get("/", getAllCategories)

// store category
categoryRouter.post("/", verifyToken, storeCategory)

// delete category
categoryRouter.delete("/:id", verifyToken, idValidation, deleteCategory)

// update category
categoryRouter.patch("/:id", verifyToken, idValidation, updateCategory)

module.exports = categoryRouter
const { Router } = require("express")
const { register, login } = require("../controllers/userController")
const { encryptPassword } = require("../middlewares/authMiddleware")

const userRouter = Router()

// register route
userRouter.post("/register", encryptPassword, register)

// login route
userRouter.post("/login", login)

module.exports = userRouter
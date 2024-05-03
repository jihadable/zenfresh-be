const { Router } = require("express")
const { register, login, userProfile } = require("../controllers/userController")
const { encryptPassword, verifyToken } = require("../middlewares/authMiddleware")

const userRouter = Router()

// user profile route
userRouter.get("/user-profile", verifyToken, userProfile)

// register route
userRouter.post("/register", encryptPassword, register)

// login route
userRouter.post("/login", login)

module.exports = userRouter
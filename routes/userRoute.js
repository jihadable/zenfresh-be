const { Router } = require("express")
const { register, login, getUserProfile, updateUserProfile } = require("../controllers/userController")
const { encryptPassword, verifyToken } = require("../middlewares/authMiddleware")

const userRouter = Router()

// user profile route
userRouter.get("/", verifyToken, getUserProfile)

// register route
userRouter.post("/register", encryptPassword, register)

// login route
userRouter.post("/login", login)

// update user profile route
userRouter.patch("/", verifyToken, updateUserProfile)

module.exports = userRouter
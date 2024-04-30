const express = require("express")
const { register, login, logout } = require("../controllers/userController")

const userRouter = {
    register: express.Router(),
    login: express.Router(),
    logout: express.Router()
}

// register route
userRouter.register.post("/", register)

// login route
userRouter.login.post("/", login)

// logout route
userRouter.logout.post("/", logout)

module.exports = { userRouter }
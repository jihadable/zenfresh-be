const { User } = require("../models/userModel")
const { compareSync } = require("bcrypt")
const serverErrorResponse = require("../utils/serverErrorResponse")
const defaultResponse = require("../utils/defaultResponse")

// register method
const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })

        // user have already registered
        if (user){
            return res.status(400).json(defaultResponse(400, false, "User have already registered"))
        }

        user = await User.create({ ...req.body })
    
        return res.status(201).json({
            ...defaultResponse(201, true, "User registered"),
            user: user.response(),
            token: await user.generateJWT()
        })

    } catch (error){
        serverErrorResponse(error, res)
    }
}

// login method
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        // there is no such user
        if (!user){
            return res.status(401).json(defaultResponse(401, false, "Invalid email or password"))
        }

        // wrong password
        if (!compareSync(password, user.password)){
            return res.status(401).json(defaultResponse(401, false, "Invalid email or password"))
        }

        return res.status(202).json({
            ...defaultResponse(202, true, "User Logged in successfully"),
            user: user.response(),
            token: await user.generateJWT()
        })
    } catch (error){
        serverErrorResponse(error, res)
    }
}

module.exports = { register, login }
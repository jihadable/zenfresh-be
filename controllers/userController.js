const { User } = require("../models/userModel")
const { compareSync } = require("bcrypt")
const errorResponse = require("../utils/errorResponse")

// register method
const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })

        // user have already registered
        if (user){
            return res.status(400).json({
                status: 400,
                message: "User have already registered"
            })
        }

        user = await User.create({ ...req.body })
    
        return res.status(201).json({
            status: 201,
            message: "User registered",
            user: {
                fullname: user.fullname,
                email: user.email,
                address: user.address,
                role: user.role
            },
            token: await user.generateJWT()
        })

    } catch (error){
        errorResponse(error, res)
    }
}

// login method
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        // there is no such user
        if (!user){
            return res.status(404).json({
                status: 404,
                message: "Resource not found"
            })
        }

        // wrong password
        if (!compareSync(password, user.password)){
            return res.status(401).json({
                status: 401,
                message: "Invalid email or password"
            })
        }

        return res.status(202).json({
            status: 202,
            message: "Login successfully",
            user: {
                fullname: user.fullname,
                email: user.email,
                address: user.address,
                role: user.role
            },
            token: await user.generateJWT()
        })
    } catch (error){
        errorResponse(error, res)
    }
}

module.exports = { register, login }
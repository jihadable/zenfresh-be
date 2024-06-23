const { User } = require("../models/userModel")
const { compareSync } = require("bcrypt")
const serverErrorResponse = require("../utils/serverErrorResponse")
const defaultResponse = require("../utils/defaultResponse")
const { Laundry } = require("../models/laundryModel")

// get user profile method
const getUserProfile = async (req, res) => {
    try {
        const { user_id } = req.body

        const user = await User.findById(user_id)

        if (!user){
            return res.status(401).json(defaultResponse(401, false, "Invalid token"))
        }

        let laundries

        if (user.role === "admin"){
            laundries = await Laundry.find().sort({ createdAt: -1 }).populate("user").populate("category")
        }
        else {
            laundries = await Laundry.find({ user: user_id }).sort({ createdAt: -1 }).populate("user").populate("category")
        }

        return res.status(200).json({
            ...defaultResponse(200, true, "Get user profile successfully"),
            user: user.response(),
            laundries: laundries.map(laundry => laundry.response())
        })
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

// register method
const register = async (req, res) => {
    try {
        if (req.body.role === "admin"){
            return res.status(400).json(defaultResponse(400, false, "Invalid role"))
        }

        return res.status(400).json(defaultResponse(400, false, "Cannot register"))
        
        let user = await User.findOne({ email: req.body.email })

        if (user){
            return res.status(400).json(defaultResponse(400, false, "User have already registered"))
        }

        user = await User.create({ ...req.body })
    
        return res.status(201).json({
            ...defaultResponse(201, true, "User registered"),
            token: await user.generateJWT()
        })

    } catch (error){
        return serverErrorResponse(error, res)
    }
}

// login method
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user){
            return res.status(401).json(defaultResponse(401, false, "Invalid email or password"))
        }

        if (!compareSync(password, user.password)){
            return res.status(401).json(defaultResponse(401, false, "Invalid email or password"))
        }

        return res.status(202).json({
            ...defaultResponse(202, true, "User Logged in successfully"),
            token: await user.generateJWT()
        })
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

// update user profile method
const updateUserProfile = async(req, res) => {
    try {
        const { user_id } = req.body

        const user = await User.findByIdAndUpdate(user_id, { ...req.body })

        if (!user){
            return res.status(401).json(defaultResponse(401, false, "Invalid token"))
        }

        return res.status(200).json(defaultResponse(200, true, "User profile updated successfully"))
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

module.exports = { getUserProfile, register, login, updateUserProfile }
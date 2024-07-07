const { User } = require("../models/userModel")
const { compareSync } = require("bcrypt")
const serverErrorResponse = require("../utils/serverErrorResponse")
const defaultResponse = require("../utils/defaultResponse")
const Joi = require("joi")

// get user profile method
const getUserProfile = async (req, res) => {
    try {
        const { user_id } = req.body

        const user = await User.findById(user_id)

        if (!user){
            return res.status(401).json(defaultResponse(401, false, "Token invalid"))
        }

        return res.status(200).json({
            ...defaultResponse(200, true, "Berhasil mendapatkan data pengguna"),
            user: user.response()
        })
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

// register method
const register = async (req, res) => {
    const registerSchema = Joi.object({
        fullname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        phone: Joi.string().pattern(/^08\d{8,13}$/).required(),
        address: Joi.string().required(),
        role: Joi.string().valid("customer").required()
    })

    const { error } = registerSchema.validate(req.body)
    
    if (error){
        return res.status(400).json(defaultResponse(400, false, error.details[0].message))
    }

    try {
        let user = await User.findOne({ email: req.body.email })

        if (user){
            return res.status(400).json(defaultResponse(400, false, "Pengguna sudah terdaftar"))
        }

        user = await User.create({ ...req.body, role: "customer" })
    
        return res.status(201).json({
            ...defaultResponse(201, true, "Pengguna berhasil registrasi"),
            token: await user.generateJWT()
        })

    } catch (error){
        return serverErrorResponse(error, res)
    }
}

// login method
const login = async (req, res) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })

    const { error } = loginSchema.validate(req.body)
    
    if (error){
        return res.status(400).json(defaultResponse(400, false, error.details[0].message))
    }

    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user || !compareSync(password, user.password)){
            return res.status(401).json(defaultResponse(401, false, "Email atau password salah"))
        }

        return res.status(202).json({
            ...defaultResponse(202, true, "Pengguna berhasil login"),
            token: await user.generateJWT()
        })
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

// update user profile method
const updateUserProfile = async(req, res) => {
    const updateUserProfileSchema = Joi.object({
        user_id: Joi.string().required(),
        phone: Joi.string().pattern(/^08\d{8,13}$/).required(),
        address: Joi.string().required()
    })

    const { error } = updateUserProfileSchema.validate(req.body)

    if (error){
        return res.status(400).json(defaultResponse(400, false, error.details[0].message))
    }

    try {
        const { user_id } = req.body

        const user = await User.findByIdAndUpdate(user_id, { ...req.body })

        if (!user){
            return res.status(401).json(defaultResponse(401, false, "Token invalid"))
        }

        return res.status(200).json(defaultResponse(200, true, "Berhasil memperbarui data pengguna"))
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

module.exports = { getUserProfile, register, login, updateUserProfile }
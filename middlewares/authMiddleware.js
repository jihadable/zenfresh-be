const { hash } = require("bcrypt")
const { verify } = require("jsonwebtoken")
const serverErrorResponse = require("../utils/serverErrorResponse")
const defaultResponse = require("../utils/defaultResponse")
const { User } = require("../models/userModel")

// encrypt password method
const encryptPassword = async (req, res, next) => {
    try {
        req.body.password = await hash(req.body.password, 10)
        
        next()
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

// extract user_id from authorization token
const verifyToken = async (req, res, next) => {
    try {
        const authorization = req.header("Authorization")

        if (!authorization){
            return res.status(401).json(defaultResponse(401, false, "Token invalid"))
        }
        
        const token = authorization.split(" ")[1]
        
        const { id } = verify(token, process.env.JWT_SECRET)

        const user = await User.findById(id)

        if (!user){
            return res.status(404).json(defaultResponse(404, false, "Pengguna tidak terdaftar"))
        }

        req.body.user_id = id

        next()
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

module.exports = { encryptPassword, verifyToken }
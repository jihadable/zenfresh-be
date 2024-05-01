const { hash } = require("bcrypt")
const { verify } = require("jsonwebtoken")
const errorResponse = require("../utils/errorResponse")

// encrypt password method
const encryptPassword = async (req, res, next) => {
    try {
        req.body.password = await hash(req.body.password, 10)
        
        next()
    } catch (error){
        errorResponse(error)
    }
}

// extract user_id from authorization token
const extractUserId = async (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1]

        if (!token){
            return res.status(401).json({
                status: 401,
                message: "Token not provided"
            })
        }

        const { id } = verify(token, process.env.JWT_SECRET)

        req.body.user_id = id

        next()
    } catch (error){
        errorResponse(error)
    }
}

module.exports = { encryptPassword, extractUserId }
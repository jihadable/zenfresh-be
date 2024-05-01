const { hash } = require("bcrypt")
const { verify } = require("jsonwebtoken")
const errorResponse = require("../utils/errorResponse")

// encrypt password method
const encryptPassword = async (req, res, next) => {
    try {
        req.body.password = await hash(req.body.password, 10)
        
        next()
    } catch (error){
        errorResponse(error, res)
    }
}

// extract user_id from authorization token
const extractUserId = async (req, res, next) => {
    try {
        const authorization = req.header("Authorization")

        if (!authorization){
            return res.status(401).json({
                status: 401,
                message: "Token not provided"
            })
        }

        const token = authorization.split(" ")[1]

        const { id } = verify(token, process.env.JWT_SECRET)

        req.body.user_id = id

        next()
    } catch (error){
        errorResponse(error, res)
    }
}

module.exports = { encryptPassword, extractUserId }
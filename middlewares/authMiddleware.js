const { hash } = require("bcrypt")
const { verify } = require("jsonwebtoken")
const serverErrorResponse = require("../utils/serverErrorResponse")
const defaultResponse = require("../utils/defaultResponse")

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
            return res.status(401).json(defaultResponse(401, false, "Token not provided"))
        }
        
        const token = authorization.split(" ")[1]
        
        const { id } = verify(token, process.env.JWT_SECRET)

        req.body.user_id = id

        next()
    } catch (error){
        return serverErrorResponse(error, res)
    }
}

module.exports = { encryptPassword, verifyToken }
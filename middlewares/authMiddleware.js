const { hash } = require("bcrypt")
const { verify } = require("jsonwebtoken")

// encrypt password method
const encryptPassword = async (req, res, next) => {
    try {
        const hashedPassword = await hash(req.body.password, 10)
        
        req.body.password = hashedPassword
        
        next()
    } catch (error){
        console.error(error.message)

        res.status(500).json({
            status: 500,
            message: "Failed to encrypt password"
        })
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
        console.error(error.message)

        res.status(500).json({
            status: 500,
            message: "Failed to get token"
        })
    }
}

module.exports = { encryptPassword, extractUserId }
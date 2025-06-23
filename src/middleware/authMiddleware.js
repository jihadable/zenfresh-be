const { verify } = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try {
        const authorization = req.header("Authorization")
        if (!authorization){
            return next()
        }
        
        const token = authorization.split(" ")[1]
        if (!token){
            return next()
        }
        
        const payload = verify(token, process.env.JWT_SECRET)

        res.locals.user = payload || null

        next()
    } catch(error){
        console.log(error)
    }
}

module.exports = authMiddleware
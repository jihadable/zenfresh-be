const { verify } = require("jsonwebtoken")

const authMiddleware = (authorization, ...allowedRoles) => {
    try {
        if (!authorization){
            throw new Error("JWT not found")
        }
        
        const token = authorization.split(" ")[1]
        if (!token){
            throw new Error("JWT not found")
        }
        
        const payload = verify(token, process.env.JWT_SECRET)

        if (allowedRoles.length != 0 && !allowedRoles.includes(payload.role)){
            throw new Error("User is forbidden")
        }

        return payload
    } catch(error){
        throw error
    }
}

module.exports = authMiddleware
const { verify } = require("jsonwebtoken")

const authMiddleware = (authorization, ...allowedRoles) => {
    try {
        if (!authorization){
            throw new Error("Token tidak ditemukan")
        }
        
        const token = authorization.split(" ")[1]
        if (!token){
            throw new Error("Token tidak ditemukan")
        }
        
        const payload = verify(token, process.env.JWT_SECRET)

        if (allowedRoles.length != 0 && !allowedRoles.includes(payload.role)){
            throw new Error("Pengguna tidak diizinkan")
        }

        return payload
    } catch(error){
        throw error
    }
}

module.exports = authMiddleware
const { verify } = require("jsonwebtoken")

const auth = authorization => {
    try {
        if (!authorization){
            throw new Error("Token tidak ditemukan")
        }
        
        const token = authorization.split(" ")[1]
        if (!token){
            throw new Error("Token tidak ditemukan")
        }
        
        const payload = verify(token, process.env.JWT_SECRET)

        return payload
    } catch(error){
        throw error
    }
}

const authorizeRole = (authorization, ...allowedRoles) => {
    try {
        const user = auth(authorization)

        if (!allowedRoles.includes(user.role)){
            throw new Error("Pengguna tidak diizinkan")
        }

        return user
    } catch(error){
        throw error
    }
}

module.exports = { auth, authorizeRole }
const auth = context => {
    try {
        const authorization = context.header("Authorization")
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
        console.log(error)
        throw error
    }
}

const authorizeRole = (context, ...allowedRoles) => {
    try {
        const user = auth(context)

        if (!allowedRoles.includes(user.role)){
            throw new Error("Pengguna tidak diizinkan")
        }

        return user
    } catch(error){
        console.log(error)
        throw error
    }
}

module.exports = { auth, authorizeRole }
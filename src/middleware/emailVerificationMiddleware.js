const emailVerifiedMiddleware = isEmailVerified => {
    try {
        if (!isEmailVerified){
            throw new Error("Email pengguna belum terverifikasi")
        }
    } catch(error){
        throw error
    }
}

module.exports = emailVerifiedMiddleware
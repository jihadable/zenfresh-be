const emailVerifiedMiddleware = isEmailVerified => {
    try {
        if (!isEmailVerified){
            throw new Error("Email is not verified")
        }
    } catch(error){
        throw error
    }
}

export default emailVerifiedMiddleware
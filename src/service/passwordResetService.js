import { hash } from "bcrypt"
import { startSession } from "mongoose"
import { sendPasswordResetEmail } from "../helper/mailer.js"
import { getToken } from "../helper/tokenizer.js"
import PasswordReset from "../model/passwordReset.js"
import User from "../model/user.js"

class PasswordResetService {
    constructor(){
        this._model = PasswordReset
        this._userModel = User
    }

    async resetPassword(token, newPassword){
        const session = await startSession()
        session.startTransaction()

        let user

        try {
            const passwordReset = await this._model.findOne({ token }, null, { session })
            if (!passwordReset){
                throw new Error("Invalid token")
            }
            if (passwordReset.expires_at < new Date()){
                await this._model.deleteOne({ _id: passwordReset._id })
                throw new Error("Token is expired")
            }

            const hashedNewPassword = await hash(newPassword, 10)
            user = await this._userModel.findByIdAndUpdate(passwordReset.user, { password: hashedNewPassword }, { session })

            if (user.modifiedCount == 0){
                throw new Error("User not found")
            }

            await this._model.deleteOne({ _id: passwordReset._id }, { session })
            
            await session.commitTransaction()
        } catch(error){
            await session.abortTransaction()
            throw error
        } finally {
            await session.endSession()
        }

        return user
    }

    async sendPasswordResetEmail(email){
        const session = await startSession()
        session.startTransaction()

        let user, token

        try {
            user = await this._userModel.findOne({ email, role: "customer" }, null, { session })
            if (!user){
                throw new Error("Invalid token")
            }

            token = getToken()
            const expireTime = new Date(Date.now() + 24 * 60 * 60 * 1000)
            await this._model.create([{
                user: user._id,
                token,
                expires_at: expireTime
            }], { session })

            await session.commitTransaction()
        } catch(error){
            await session.abortTransaction()
            throw error
        } finally {
            await session.endSession()
        }

        const passwordResetLink = `${process.env.WEB_ENDPOINT}/reset-password/${token}`
        await sendPasswordResetEmail(user.email, passwordResetLink)

        return user
    }
}

const passwordResetService = new PasswordResetService()

export default passwordResetService
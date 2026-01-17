const { startSession } = require("mongoose");
const EmailVerification = require("../model/emailVerification");
const User = require("../model/user");
const { sendEmailVerification } = require("../helper/mailer");
const { getToken } = require("../helper/tokenizer");

class EmailVerificationService {
    constructor(){
        this._model = EmailVerification
        this._userModel = User
    }

    async verifyEmail(token){
        const session = await startSession()
        session.startTransaction()

        let user

        try {
            const emailVerification = await this._model.findOne({ token }, null, { session })

            if (!emailVerification){
                throw new Error("Invalid token")
            }

            if (emailVerification.expires_at < new Date()){
                await this._model.deleteOne({ _id: emailVerification._id }, { session })
                throw new Error("Token is expired")
            }

            user = await this._userModel.findByIdAndUpdate({ _id: emailVerification.user }, { is_email_verified: true }, { new: true, session })

            if (user.modifiedCount == 0){
                throw new Error("User not found")
            }

            await this._model.deleteOne({ _id: emailVerification._id }, { session })

            await session.commitTransaction()
        } catch(error){
            await session.abortTransaction()
            throw error
        } finally {
            await session.endSession()
        }

        return user
    }

    async sendEmailVerification(userId){
        const session = await startSession()
        session.startTransaction()

        let user, token

        try {
            user = await this._userModel.findOne({ _id: userId }, null, { session })

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
        
        const emailVerificationLink = `${process.env.WEB_ENDPOINT}/verify-email/${token}`
        await sendEmailVerification(user.email, emailVerificationLink)

        return user
    }
}

const emailVerificationService = new EmailVerificationService()

module.exports = emailVerificationService
import { compareSync, hash } from "bcrypt"
import { startSession } from "mongoose"
import { sendEmailVerification } from "../helper/mailer.js"
import { getToken } from "../helper/tokenizer.js"
import EmailVerification from "../model/emailVerification.js"
import User from "../model/user.js"

class UserService {
    constructor(){
        this._model = User
        this._emailVerificationModel = EmailVerification
    }

    async addUser({ name, email, password, phone, address, role, is_email_verified }){
        const session = await startSession()
        session.startTransaction()
        
        let user, token
        
        try {
            const hashedPassword = await hash(password, 10)
    
            const users = await this._model.create([{
                name,
                email,
                password: hashedPassword,
                phone,
                address,
                role,
                is_email_verified
            }], { session })
            user = users[0]
            
            token = getToken()
            const expireTime = new Date(Date.now() + 24 * 60 * 60 * 1000)
            await this._emailVerificationModel.create([{
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

    async getUserById(id){
        const user = await this._model.findById(id)

        if (!user){
            throw new Error("User not found")
        }

        return user
    }

    async verifyUser(email, password){
        const user = await this._model.findOne({ email })

        if (!user){
            throw new Error("User not found")
        }

        if (!compareSync(password, user.password)){
            throw new Error("Incorrect email or password")
        }

        return user
    }

    async updateUserById(id, { name, phone, address }){
        const user = await this._model.findByIdAndUpdate(id, { name, phone, address }, { new: true })

        if (!user){
            throw new Error("User not found")
        }

        return user
    }

    async updatePassword(id, { password, newPassword }){
        if (password == newPassword){
            throw new Error("New password can not be same with old password")
        }

        const user = await this._model.findById(id)
        if (!user){
            throw new Error("User not found")
        }

        if (!compareSync(password, user.password)){
            throw new Error("Incorrect password")
        }

        const hashedNewPassword = await hash(newPassword, 10)
        user.password = hashedNewPassword
        await user.save()

        return user
    }
}

const userService = new UserService()

export default userService
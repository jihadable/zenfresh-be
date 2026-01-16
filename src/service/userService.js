const { hash, compareSync } = require("bcrypt")
const User = require("../model/user")
const { startSession } = require("mongoose")
const EmailVerification = require("../model/emailVerification")
const { getToken } = require("../helper/tokenizer")
const { sendEmailVerification } = require("../helper/mailer")

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
            throw new Error("Pengguna tidak ditemukan")
        }

        return user
    }

    async verifyUser(email, password){
        const user = await this._model.findOne({ email })

        if (!user){
            throw new Error("Pengguna tidak ditemukan")
        }

        if (!compareSync(password, user.password)){
            throw new Error("Email atau password salah")
        }

        return user
    }

    async updateUserById(id, { name, phone, address }){
        const user = await this._model.findByIdAndUpdate(id, { name, phone, address }, { new: true })

        if (!user){
            throw new Error("Pengguna tidak ditemukan")
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
            throw new Error("Password is incorrect")                
        }

        const hashedNewPassword = await hash(newPassword, 10)
        user.password = hashedNewPassword
        await user.save()

        return user
    }
}

const userService = new UserService()

module.exports = userService
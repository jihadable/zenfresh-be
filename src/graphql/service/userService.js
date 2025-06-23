const { hash, compareSync } = require("bcrypt")
const User = require("../../model/user")

class UserService {
    constructor(){
        this._model = User
    }

    async addUser({ name, email, password, phone, address }){
        const hashedPassword = await hash(password, 10)
        const role = "customer"

        const user = await this._model.create({ name, email, password: hashedPassword, phone, address, role })

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
        await this.getUserById(id)
        const user = await this._model.findByIdAndUpdate(id, { name, phone, address }, { new: true })

        return user
    }
}

const userService = new UserService()

module.exports = userService
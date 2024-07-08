const { hash } = require("bcrypt")
const { User } = require("../models/userModel")

const userMigration = async() => {
    await User.deleteMany()

    await Promise.all([
        User.create({
            fullname: "Umar Jihad",
            email: "umarjihad@gmail.com",
            password: await hash("abcddcba", 10),
            phone: "082352395596",
            address: "Jl. Langsat",
            role: "customer"
        }),
        User.create({
            fullname: "_Admin",
            email: "admin@gmail.com",
            password: await hash("abcddcba", 10),
            role: "admin"
        })
    ]) 
}

module.exports = userMigration
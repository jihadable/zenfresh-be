const { hash } = require("bcrypt")
const { User } = require("../models/userModel")

const userMigration = async() => {
    await User.deleteMany()

    await User.create({
        fullname: "Umar Jihad",
        email: "umarjihad@gmail.com",
        password: await hash("abcddcba", 10),
        no_hp: "082352395596",
        address: "Jl. Langsat",
        role: "customer"
    })

    await User.create({
        fullname: "_Admin",
        email: "admin@gmail.com",
        password: await hash("abcddcba", 10),
        role: "admin"
    })
}

module.exports = userMigration
const { hash } = require("bcrypt")

const getUsers = async() => {
    const password = process.env.PRIVATE_PASSWORD

    return [
        {
            role: "admin",
            email: "zenfreshadmin@gmail.com",
            name: "zenfresh admin",
            password: await hash(password, 10)
        },
        {
            role: "customer",
            email: "umarjihad@gmail.com",
            name: "umar jihad",
            password: await hash(password, 10),
            phone: "082352395596",
            address: "Jl. Langsat",
            is_email_verified: true
        }
    ]
}

module.exports = getUsers
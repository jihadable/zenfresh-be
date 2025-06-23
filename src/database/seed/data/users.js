const { hash } = require("bcrypt")

const getUsers = async() => {
    const password = process.env.PRIVATE_PASSWORD

    return [
        {
            role: "admin",
            email: "luminousadmin@gmail.com",
            name: "luminous admin",
            password: await hash(password, 10)
        },
        {
            role: "customer",
            email: "umarjihad@gmail.com",
            name: "umar jihad",
            password: await hash(password, 10),
            phone: "082352395596",
            address: "Jl. langsat"
        }
    ]
}

module.exports = getUsers
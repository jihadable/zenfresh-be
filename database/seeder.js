const { hash } = require("bcrypt")
const { User } = require("../models/userModel")
const { Category } = require("../models/categoryModel")

const seeder = async() => {
    await Promise.all([
        userSeeder(), categorySeeder()
    ])
}

const userSeeder = async() => {
    await Promise.all([
        User.create({
            fullname: "Umar Jihad",
            email: "umarjihad@gmail.com",
            password: await hash(process.env.PRIVATE_PASSWORD, 10),
            phone: "082352395596",
            address: "Jl. Langsat",
            role: "customer"
        }),
        User.create({
            fullname: "_Admin",
            email: "admin@gmail.com",
            password: await hash(process.env.PRIVATE_PASSWORD, 10),
            role: "admin"
        })
    ]) 
}

const categorySeeder = async() => {
    await Promise.all([
        Category.create({
            name: "Biasa",
            price: 6000,
            duration: "2 hari"
        }),
        Category.create({
            name: "Kilat",
            price: 8000,
            duration: "1 hari"
        }),
        Category.create({
            name: "Premium",
            price: 12000,
            duration: "Kurang dari 1 hari"
        })
    ])
}

module.exports = seeder
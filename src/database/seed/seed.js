const mongoose = require("mongoose")
const Category = require("../../model/category")
const Order = require("../../model/order")
const User = require("../../model/user")
const connectDB = require("../db")
const getCategories = require("./data/categories")
const getUsers = require("./data/users")

const seed = async() => {
    await connectDB()

    await User.deleteMany()
    await Category.deleteMany()
    await Order.deleteMany()

    const users = await getUsers()
    await User.create(users)

    const categories = getCategories()
    await Category.create(categories)
}

seed()
    .then(() => {
        console.log("✅ Seeding completed successfully.")
    })
    .catch(error => {
        console.error("❌ Seeding failed:", error)
        process.exit(1)
    })
    .finally(() => mongoose.disconnect());
const mongoose = require("mongoose")
const Category = require("../../../model/category")
const Order = require("../../../model/order")
const connectDB = require("../db")
const getCategories = require("./data/categories")
const getUsers = require("./data/users")
const User = require("../../../model/user")
const EmailVerification = require("../../../model/emailVerification")
const { getToken } = require("../../../helper/tokenizer")
const { hash } = require("bcrypt")

const userWithEmailVerificationSeed = async() => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const password = await hash(process.env.PRIVATE_PASSWORD, 10)
        const [ user ] = await User.create([{
            name: "test",
            email: "test3@gmail.com",
            password,
            phone: "082352395596",
            address: "Jl. Langsat",
            role: "customer",
            is_email_verified: false
        }], { session })

        const token = getToken()
        const expireTime = new Date(Date.now() + 24 * 60 * 60 * 1000)
        const [ emailVerification ] = await EmailVerification.create([{
            user: user._id,
            token,
            expires_at: expireTime
        }], { session })

        await session.commitTransaction()

        console.log(emailVerification.token)
    } catch(error){
        await session.abortTransaction()
        throw error
    } finally {
        await session.endSession()
    }
}

const seed = async() => {
    await connectDB()

    await User.deleteMany()
    await Category.deleteMany()
    await Order.deleteMany()
    await EmailVerification.deleteMany()

    const users = await getUsers()
    await User.create(users)

    const categories = getCategories()
    await Category.create(categories)

    await userWithEmailVerificationSeed()
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
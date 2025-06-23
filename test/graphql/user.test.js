const request = require("supertest")
const app = require("./testApp")
const mongoose = require("mongoose")

describe("User API", () => {
    afterAll(async () => {
        await mongoose.connection.close()
    })

    test("Register with valid payload", async() => {
        const response = await request(app).post("/graphql").send({
            query:
            `mutation {
                register(
                    name: "test",
                    email: "test@gmail.com",
                    password: "${process.env.PRIVATE_PASSWORD}",
                    phone: "081234567890",
                    address: "Jl. Langsat"
                ){
                    token
                    user {
                        id
                        name
                        email
                        phone
                        address
                    }
                }
            }`
        })

        
    })
})
const request = require("supertest")
const app = require("./testApp")
const mongoose = require("mongoose")

describe("Password Reset API", () => {
    afterAll(async() => {
        await mongoose.connection.close()
    })

    test("Send passowrd reset email", async() => {

    })

    test("Send password reset email with invalid email", async() => {
        const response = await request(app).post("/graphql")
            .send({
                query:
                `mutation {
                    send_password_reset_email(email: "xxx"){
                        id, name, email, phone, address, role, is_email_verified
                    }
                }`
            })

        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })

    test("Reset password", async() => {

    })

    test("Reset password with invalid token", async() => {
        const response = await request(app).post("/graphql")
            .send({
                query:
                `mutation {
                    reset_password(token: "xxx", new_password: "TopSecret"){
                        id, name, email, phone, address, role, is_email_verified
                    }
                }`
            })
        
        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })
})
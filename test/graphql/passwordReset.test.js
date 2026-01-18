const request = require("supertest")
const app = require("./testApp")
const mongoose = require("mongoose")

describe("Password Reset API", () => {
    const passwordResetToken = process.env.PASSWORD_RESET_TOKEN
    
    afterAll(async() => {
        await mongoose.connection.close()
    })

    test("Send passowrd reset email", async() => {
        const response = await request(app).post("/graphql")
            .send({
                query:
                `mutation {
                    send_password_reset_email(email: "jihadumar1021@gmail.com"){
                        id, name, email, phone, address, role, is_email_verified
                    }
                }`
            })
        
        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("send_password_reset_email")

        expect(response.body.data.send_password_reset_email).toHaveProperty("id")
        expect(response.body.data.send_password_reset_email).toHaveProperty("name")
        expect(response.body.data.send_password_reset_email).toHaveProperty("email")
        expect(response.body.data.send_password_reset_email).toHaveProperty("phone")
        expect(response.body.data.send_password_reset_email).toHaveProperty("address")
        expect(response.body.data.send_password_reset_email).toHaveProperty("role")
        expect(response.body.data.send_password_reset_email).toHaveProperty("is_email_verified")

        expect(response.body.data.send_password_reset_email.email).toBe("jihadumar1021@gmail.com")
        expect(response.body.data.send_password_reset_email.role).toBe("customer")
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
        const response = await request(app).post("/graphql")
            .send({
                query:
                `mutation {
                    reset_password(token: "${passwordResetToken}", new_password: "${process.env.NEW_PRIVATE_PASSWORD}"){
                        id, name, email, phone, address, role, is_email_verified
                    }
                }`
            })

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("reset_password")

        expect(response.body.data.reset_password).toHaveProperty("id")
        expect(response.body.data.reset_password).toHaveProperty("name")
        expect(response.body.data.reset_password).toHaveProperty("email")
        expect(response.body.data.reset_password).toHaveProperty("phone")
        expect(response.body.data.reset_password).toHaveProperty("address")
        expect(response.body.data.reset_password).toHaveProperty("role")
        expect(response.body.data.reset_password).toHaveProperty("is_email_verified")

        expect(response.body.data.reset_password.email).toBe("jihadumar1021@gmail.com")
        expect(response.body.data.reset_password.role).toBe("customer")
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
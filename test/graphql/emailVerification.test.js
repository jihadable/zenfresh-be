const request = require("supertest")
const app = require("./testApp")
const mongoose = require("mongoose")

describe("Email Verification API", () => {
    let customer_jwt, admin_jwt
    const email_verification_token = process.env.EMAIL_VERIFICATION_TOKEN

    afterAll(async() => {
        await mongoose.connection.close()
    })

    test("Login as customer", async() => {
        const response = await request(app).post("/graphql").send({
            query:
            `mutation {
                login(
                    email: "jihadumar1021@gmail.com"
                    password: "${process.env.PRIVATE_PASSWORD}"
                ){
                    jwt,
                    user { id, name, email, phone, address, role, is_email_verified }
                }
            }`
        })

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("login")

        expect(response.body.data.login).toHaveProperty("jwt")
        customer_jwt = response.body.data.login.jwt
        expect(response.body.data.login).toHaveProperty("user")

        expect(response.body.data.login.user).toHaveProperty("id")
        expect(response.body.data.login.user).toHaveProperty("name")
        expect(response.body.data.login.user).toHaveProperty("email")
        expect(response.body.data.login.user).toHaveProperty("phone")
        expect(response.body.data.login.user).toHaveProperty("address")
        expect(response.body.data.login.user).toHaveProperty("role")
        expect(response.body.data.login.user).toHaveProperty("is_email_verified")

        expect(response.body.data.login.user.name).toBe("jihad umar")
        expect(response.body.data.login.user.email).toBe("jihadumar1021@gmail.com")
        expect(response.body.data.login.user.phone).toBe("082352395596")
        expect(response.body.data.login.user.address).toBe("Jl. Langsat")
        expect(response.body.data.login.user.role).toBe("customer")
        expect(response.body.data.login.user.is_email_verified).toBe(false)
    })

    test("Login as admin", async() => {
        const response = await request(app).post("/graphql").send({
            query:
            `mutation {
                login(
                    email: "zenfreshadmin@gmail.com",
                    password: "${process.env.PRIVATE_PASSWORD}"
                ){
                    jwt,
                    user { id, name, email, role }    
                }
            }`
        })

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("login")

        expect(response.body.data.login).toHaveProperty("jwt")
        admin_jwt = response.body.data.login.jwt
        expect(response.body.data.login).toHaveProperty("user")

        expect(response.body.data.login.user).toHaveProperty("id")
        expect(response.body.data.login.user).toHaveProperty("name")
        expect(response.body.data.login.user).toHaveProperty("email")
        expect(response.body.data.login.user).toHaveProperty("role")

        expect(response.body.data.login.user.name).toBe("zenfresh admin")
        expect(response.body.data.login.user.email).toBe("zenfreshadmin@gmail.com")
        expect(response.body.data.login.user.role).toBe("admin")
    })

    test("Send email verification", async() => {
        const response = await request(app).post("/graphql")
            .set({
                "Authorization": `Bearer ${customer_jwt}`
            })
            .send({
                query:
                `mutation {
                    send_email_verification {
                        id, name, email, phone, address, role, is_email_verified
                    }
                }`
            })

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("send_email_verification")

        expect(response.body.data.send_email_verification).toHaveProperty("id")
        expect(response.body.data.send_email_verification).toHaveProperty("name")
        expect(response.body.data.send_email_verification).toHaveProperty("email")
        expect(response.body.data.send_email_verification).toHaveProperty("phone")
        expect(response.body.data.send_email_verification).toHaveProperty("address")
        expect(response.body.data.send_email_verification).toHaveProperty("role")
        expect(response.body.data.send_email_verification).toHaveProperty("is_email_verified")

        expect(response.body.data.send_email_verification.name).toBe("jihad umar")
        expect(response.body.data.send_email_verification.email).toBe("jihadumar1021@gmail.com")
        expect(response.body.data.send_email_verification.phone).toBe("082352395596")
        expect(response.body.data.send_email_verification.address).toBe("Jl. Langsat")
        expect(response.body.data.send_email_verification.role).toBe("customer")
        expect(response.body.data.send_email_verification.is_email_verified).toBe(false)
    })

    test("Send email verification without jwt", async() => {
        const response = await request(app).post("/graphql")
            .send({
                query:
                `mutation {
                    send_email_verification {
                        id, name, email, phone, address, role, is_email_verified
                    }
                }`
            })

        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })

    test("Send email verification with admin", async() => {
        const response = await request(app).post("/graphql")
            .set({
                "Authorization": `Bearer ${admin_jwt}`
            })
            .send({
                query:
                `mutation {
                    send_email_verification {
                        id, name, email, phone, address, role, is_email_verified
                    }
                }`
            })

        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })

    test("Verify email", async() => {
        const response = await request(app).post("/graphql")
            .send({
                query:
                `mutation {
                    verify_email(token: "${email_verification_token}"){
                        id, name, email, phone, address, role, is_email_verified
                    }
                }`
            })

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("verify_email")

        expect(response.body.data.verify_email).toHaveProperty("id")
        expect(response.body.data.verify_email).toHaveProperty("name")
        expect(response.body.data.verify_email).toHaveProperty("email")
        expect(response.body.data.verify_email).toHaveProperty("phone")
        expect(response.body.data.verify_email).toHaveProperty("address")
        expect(response.body.data.verify_email).toHaveProperty("role")
        expect(response.body.data.verify_email).toHaveProperty("is_email_verified")

        expect(response.body.data.verify_email.role).toBe("customer")
        expect(response.body.data.verify_email.is_email_verified).toBe(true)
    })

    test("Verify email with invalid token", async() => {
        const response = await request(app).post("/graphql")
            .send({
                query:
                `mutation {
                    verify_email(token: "xxx"){
                        id, name, email, phone, address, role, is_email_verified
                    }
                }`
            })

        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })
})
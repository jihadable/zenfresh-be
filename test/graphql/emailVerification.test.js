const request = require("supertest")
const app = require("./testApp")
const mongoose = require("mongoose")

describe("Email Verification API", () => {
    let customer_jwt, admin_jwt, email_verification_token

    afterAll(async() => {
        await mongoose.connection.close()
    })

    test("Register", async() => {
        const response = await request(app).post("/graphql").send({
            query:
            `mutation {
                register(
                    name: "test"
                    email: "test2@gmail.com"
                    password: "${process.env.PRIVATE_PASSWORD}"
                    phone: "081234567890"
                    address: "Jl. Langsat"
                ){
                    jwt,
                    user { id, name, email, phone, address, role, is_email_verified }
                }
            }`
        })

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("register")

        expect(response.body.data.register).toHaveProperty("jwt")
        customer_jwt = response.body.data.register.jwt
        expect(response.body.data.register).toHaveProperty("user")

        expect(response.body.data.register.user).toHaveProperty("id")
        expect(response.body.data.register.user).toHaveProperty("name")
        expect(response.body.data.register.user).toHaveProperty("email")
        expect(response.body.data.register.user).toHaveProperty("phone")
        expect(response.body.data.register.user).toHaveProperty("address")
        expect(response.body.data.register.user).toHaveProperty("role")
        expect(response.body.data.register.user).toHaveProperty("is_email_verified")

        expect(response.body.data.register.user.name).toBe("test")
        expect(response.body.data.register.user.email).toBe("test2@gmail.com")
        expect(response.body.data.register.user.phone).toBe("081234567890")
        expect(response.body.data.register.user.address).toBe("Jl. Langsat")
        expect(response.body.data.register.user.role).toBe("customer")
        expect(response.body.data.register.user.is_email_verified).toBe(false)
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

        expect(response.body.data.send_email_verification.name).toBe("test")
        expect(response.body.data.send_email_verification.email).toBe("test2@gmail.com")
        expect(response.body.data.send_email_verification.phone).toBe("081234567890")
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
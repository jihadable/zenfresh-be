const request = require("supertest")
const app = require("./testApp")
const mongoose = require("mongoose")

describe("User API", () => {
    let jwt

    afterAll(async() => {
        await mongoose.connection.close()
    })

    test("Register", async() => {
        const response = await request(app).post("/graphql").send({
            query:
            `mutation {
                register(
                    name: "test"
                    email: "test@gmail.com"
                    password: "${process.env.PRIVATE_PASSWORD}"
                    phone: "081234567890"
                    address: "Jl. Langsat"
                ){
                    jwt
                    user { id, name, email, phone, address, role, is_email_verified }
                }
            }`
        })

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("register")

        expect(response.body.data.register).toHaveProperty("jwt")
        jwt = response.body.data.register.jwt
        expect(response.body.data.register).toHaveProperty("user")

        expect(response.body.data.register.user).toHaveProperty("id")
        expect(response.body.data.register.user).toHaveProperty("name")
        expect(response.body.data.register.user).toHaveProperty("email")
        expect(response.body.data.register.user).toHaveProperty("phone")
        expect(response.body.data.register.user).toHaveProperty("address")
        expect(response.body.data.register.user).toHaveProperty("role")
        expect(response.body.data.register.user).toHaveProperty("is_email_verified")

        expect(response.body.data.register.user.name).toBe("test")
        expect(response.body.data.register.user.email).toBe("test@gmail.com")
        expect(response.body.data.register.user.phone).toBe("081234567890")
        expect(response.body.data.register.user.address).toBe("Jl. Langsat")
        expect(response.body.data.register.user.role).toBe("customer")
        expect(response.body.data.register.user.is_email_verified).toBe(false)
    })

    test("Register with invalid payload", async() => {
        const response = await request(app).post("/graphql").send({
            query:
            `mutation {
                register(){
                    jwt
                    user { id, name, email, phone, address, is_email_verified }
                }
            }`
        })

        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })

    test("Get user data", async() => {
        const response = await request(app).post("/graphql")
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({
                query:
                `query {
                    user { id, name, email, phone, address, role, is_email_verified }
                }`
            })
        
        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("user")

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")
        expect(response.body.data.user).toHaveProperty("phone")
        expect(response.body.data.user).toHaveProperty("address")
        expect(response.body.data.user).toHaveProperty("role")
        expect(response.body.data.user).toHaveProperty("is_email_verified")

        expect(response.body.data.user.name).toBe("test")
        expect(response.body.data.user.email).toBe("test@gmail.com")
        expect(response.body.data.user.phone).toBe("081234567890")
        expect(response.body.data.user.address).toBe("Jl. Langsat")
        expect(response.body.data.user.role).toBe("customer")
        expect(response.body.data.user.is_email_verified).toBe(false)
    })

    test("Get user data without jwt", async() => {
        const response = await request(app).post("/graphql").send({
            query:
            `query {
                user { id, name, email, phone, address, role, is_email_verified }
            }`
        })

        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })

    test("Update user data", async() => {
        const response = await request(app).post("/graphql")
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({
                query:
                `mutation {
                    update_user(
                        name: "update test"
                        phone: "081122334455",
                        address: "Jl. Durian"
                    ){
                        id, name, email, phone, address, role, is_email_verified
                    }
                }`
            })
        
        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("update_user")

        expect(response.body.data.update_user).toHaveProperty("id")
        expect(response.body.data.update_user).toHaveProperty("name")
        expect(response.body.data.update_user).toHaveProperty("email")
        expect(response.body.data.update_user).toHaveProperty("phone")
        expect(response.body.data.update_user).toHaveProperty("address")
        expect(response.body.data.update_user).toHaveProperty("role")
        expect(response.body.data.update_user).toHaveProperty("is_email_verified")

        expect(response.body.data.update_user.name).toBe("update test")
        expect(response.body.data.update_user.email).toBe("test@gmail.com")
        expect(response.body.data.update_user.phone).toBe("081122334455")
        expect(response.body.data.update_user.address).toBe("Jl. Durian")
        expect(response.body.data.update_user.role).toBe("customer")
        expect(response.body.data.update_user.is_email_verified).toBe(false)
    })

    test("Update user data without jwt", async() => {
        const response = await request(app).post("/graphql")
            .send({
                query:
                `mutation {
                    update_user(
                        name: "update test"
                        phone: "081122334455",
                        address: "Jl. Durian"
                    ){
                        id, name, email, phone, address, role, is_email_verified
                    }
                }`
            })

        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })

    test("Login", async() => {
        const response = await request(app).post("/graphql").send({
            query: 
            `mutation {
                login(
                    email: "test@gmail.com"
                    password: "${process.env.PRIVATE_PASSWORD}"
                ){
                    jwt
                    user { id, name, email, phone, address, role, is_email_verified }
                }
            }`
        })

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("login")

        expect(response.body.data.login).toHaveProperty("jwt")
        expect(response.body.data.login).toHaveProperty("user")

        expect(response.body.data.login.user).toHaveProperty("id")
        expect(response.body.data.login.user).toHaveProperty("name")
        expect(response.body.data.login.user).toHaveProperty("email")
        expect(response.body.data.login.user).toHaveProperty("phone")
        expect(response.body.data.login.user).toHaveProperty("address")
        expect(response.body.data.login.user).toHaveProperty("role")
        expect(response.body.data.login.user).toHaveProperty("is_email_verified")

        expect(response.body.data.login.user.name).toBe("update test")
        expect(response.body.data.login.user.email).toBe("test@gmail.com")
        expect(response.body.data.login.user.phone).toBe("081122334455")
        expect(response.body.data.login.user.address).toBe("Jl. Durian")
        expect(response.body.data.login.user.role).toBe("customer")
        expect(response.body.data.login.user.is_email_verified).toBe(false)
    })

    test("Login with invalid payload", async() => {
        const response = await request(app).post("/graphql").send({
            query:
            `mutation {
                login(){
                    jwt
                    user { id, name, email, phone, address, role, is_email_verified }
                }
            }`
        })

        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })

    test("Update user password", async() => {
        const response = await request(app).post("/graphql")
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({
                query:
                `mutation {
                    update_user_password(password: "${process.env.PRIVATE_PASSWORD}", new_password: "${process.env.NEW_PRIVATE_PASSWORD}"){
                        id, name, email, phone, address, role, is_email_verified
                    }
                }`
            })

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("update_user_password")

        expect(response.body.data.update_user_password).toHaveProperty("id")
        expect(response.body.data.update_user_password).toHaveProperty("name")
        expect(response.body.data.update_user_password).toHaveProperty("email")
        expect(response.body.data.update_user_password).toHaveProperty("phone")
        expect(response.body.data.update_user_password).toHaveProperty("address")
        expect(response.body.data.update_user_password).toHaveProperty("role")
        expect(response.body.data.update_user_password).toHaveProperty("is_email_verified")

        expect(response.body.data.update_user_password.name).toBe("update test")
        expect(response.body.data.update_user_password.email).toBe("test@gmail.com")
        expect(response.body.data.update_user_password.phone).toBe("081122334455")
        expect(response.body.data.update_user_password.address).toBe("Jl. Durian")
        expect(response.body.data.update_user_password.role).toBe("customer")
        expect(response.body.data.update_user_password.is_email_verified).toBe(false)
    })

    test("Update user password with invalid payload", async() => {
        const response = await request(app).post("/graphql")
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({
                query:
                `mutation {
                    update_user_password(){
                        id, name, email, phone, address, role, is_email_verified
                    }
                }`
            })

        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })

    test("Update user password without jwt", async() => {
        const response = await request(app).post("/graphql")
            .send({
                query:
                `mutation {
                    update_user_password(password: "${process.env.PRIVATE_PASSWORD}", new_password: "${process.env.NEW_PRIVATE_PASSWORD}"){
                        id, name, email, phone, address, role, is_email_verified
                    }
                }`
            })

        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })
})
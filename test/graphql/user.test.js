const request = require("supertest")
const app = require("./testApp")
const mongoose = require("mongoose")

describe("User API", () => {
    let jwt

    afterAll(async () => {
        await mongoose.connection.close()
    })

    test("Register with valid payload", async() => {
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
                    token
                    user { id, name, email, phone, address, role }
                }
            }`
        })

        expect(response.body.errors).toBe(undefined)

        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("register")

        expect(response.body.data.register).toHaveProperty("token")
        jwt = response.body.data.register.token
        expect(response.body.data.register).toHaveProperty("user")

        expect(response.body.data.register.user).toHaveProperty("id")
        expect(response.body.data.register.user).toHaveProperty("name")
        expect(response.body.data.register.user).toHaveProperty("email")
        expect(response.body.data.register.user).toHaveProperty("address")
        expect(response.body.data.register.user).toHaveProperty("role")

        expect(response.body.data.register.user.name).toBe("test")
        expect(response.body.data.register.user.email).toBe("test@gmail.com")
        expect(response.body.data.register.user.phone).toBe("081234567890")
        expect(response.body.data.register.user.address).toBe("Jl. Langsat")
        expect(response.body.data.register.user.role).toBe("customer")
    })

    test("Register with invalid payload", async() => {
        const response = await request(app).post("/graphql").send({
            query:
            `mutation {
                register(){
                    token
                    user { id, name, email, phone, address }
                }
            }`
        })

        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })

    test("Get user data with token", async() => {
        const response = await request(app).post("/graphql")
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({
                query:
                `query {
                    user { id, name, email, phone, address, role }
                }`
            })
        
        expect(response.body.errors).toBe(undefined)

        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("user")

        expect(response.body.data.user).toHaveProperty("id")
        expect(response.body.data.user).toHaveProperty("name")
        expect(response.body.data.user).toHaveProperty("email")
        expect(response.body.data.user).toHaveProperty("address")
        expect(response.body.data.user).toHaveProperty("role")

        expect(response.body.data.user.name).toBe("test")
        expect(response.body.data.user.email).toBe("test@gmail.com")
        expect(response.body.data.user.phone).toBe("081234567890")
        expect(response.body.data.user.address).toBe("Jl. Langsat")
        expect(response.body.data.user.role).toBe("customer")
    })

    test("Get user data without token", async() => {
        const response = await request(app).post("/graphql").send({
            query:
            `query {
                user { id, name, email, phone, address, role }
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
                        id, name, email, phone, address, role    
                    }
                }`
            })
        
        expect(response.body.errors).toBe(undefined)

        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("update_user")

        expect(response.body.data.update_user).toHaveProperty("id")
        expect(response.body.data.update_user).toHaveProperty("name")
        expect(response.body.data.update_user).toHaveProperty("email")
        expect(response.body.data.update_user).toHaveProperty("address")
        expect(response.body.data.update_user).toHaveProperty("role")

        expect(response.body.data.update_user.name).toBe("update test")
        expect(response.body.data.update_user.email).toBe("test@gmail.com")
        expect(response.body.data.update_user.phone).toBe("081122334455")
        expect(response.body.data.update_user.address).toBe("Jl. Durian")
        expect(response.body.data.update_user.role).toBe("customer")
    })

    test("Login with valid payload", async() => {
        const response = await request(app).post("/graphql").send({
            query: 
            `mutation {
                login(
                    email: "test@gmail.com"
                    password: "${process.env.PRIVATE_PASSWORD}"
                ){
                    token
                    user { id, name, email, phone, address, role }
                }
            }`
        })

        expect(response.body.errors).toBe(undefined)

        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("login")

        expect(response.body.data.login).toHaveProperty("token")
        expect(response.body.data.login).toHaveProperty("user")

        expect(response.body.data.login.user).toHaveProperty("id")
        expect(response.body.data.login.user).toHaveProperty("name")
        expect(response.body.data.login.user).toHaveProperty("email")
        expect(response.body.data.login.user).toHaveProperty("address")
        expect(response.body.data.login.user).toHaveProperty("role")

        expect(response.body.data.login.user.name).toBe("update test")
        expect(response.body.data.login.user.email).toBe("test@gmail.com")
        expect(response.body.data.login.user.phone).toBe("081122334455")
        expect(response.body.data.login.user.address).toBe("Jl. Durian")
        expect(response.body.data.login.user.role).toBe("customer")
    })

    test("Login with invalid payload", async() => {
        const response = await request(app).post("/graphql").send({
            query:
            `mutation {
                login(){
                    token
                    user { id, name, email, phone, address, role }
                }
            }`
        })

        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })
})
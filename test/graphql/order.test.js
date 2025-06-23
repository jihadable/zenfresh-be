const request = require("supertest")
const app = require("./testApp")
const mongoose = require("mongoose")

describe("Order API", () => {
    let customer_jwt, admin_jwt, category_id, order_id

    afterAll(async() => {
        await mongoose.connection.close()
    })

    test("Login as customer", async() => {
        const response = await request(app).post("/graphql").send({
            query:
            `mutation {
                login(
                    email: "umarjihad@gmail.com"
                    password: "${process.env.PRIVATE_PASSWORD}"
                ){
                    token
                    user { id, name, email, phone, address, role }
                }
            }`
        })

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("login")

        expect(response.body.data.login).toHaveProperty("token")
        customer_jwt = response.body.data.login.token
        expect(response.body.data.login).toHaveProperty("user")

        expect(response.body.data.login.user).toHaveProperty("id")
        expect(response.body.data.login.user).toHaveProperty("name")
        expect(response.body.data.login.user).toHaveProperty("email")
        expect(response.body.data.login.user).toHaveProperty("phone")
        expect(response.body.data.login.user).toHaveProperty("address")
        expect(response.body.data.login.user).toHaveProperty("role")

        expect(response.body.data.login.user.name).toBe("umar jihad")
        expect(response.body.data.login.user.email).toBe("umarjihad@gmail.com")
        expect(response.body.data.login.user.phone).toBe("082352395596")
        expect(response.body.data.login.user.address).toBe("Jl. Langsat")
        expect(response.body.data.login.user.role).toBe("customer")
    })

    test("Login as admin", async() => {
        const response = await request(app).post("/graphql").send({
            query:
            `mutation {
                login(
                    email: "zenfreshadmin@gmail.com",
                    password: "${process.env.PRIVATE_PASSWORD}"
                ){
                    token
                    user { id, name, email, role }    
                }
            }`
        })

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")
        
        expect(response.body.data).toHaveProperty("login")

        expect(response.body.data.login).toHaveProperty("token")
        admin_jwt = response.body.data.login.token
        expect(response.body.data.login).toHaveProperty("user")

        expect(response.body.data.login.user).toHaveProperty("id")
        expect(response.body.data.login.user).toHaveProperty("name")
        expect(response.body.data.login.user).toHaveProperty("email")
        expect(response.body.data.login.user).toHaveProperty("role")

        expect(response.body.data.login.user.name).toBe("zenfresh admin")
        expect(response.body.data.login.user.email).toBe("zenfreshadmin@gmail.com")
        expect(response.body.data.login.user.role).toBe("admin")
    })

    test("Get categories", async() => {
        const response = await request(app).post("/graphql")
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({
                query: 
                `query {
                    categories { id, name, price, description }
                }`
            })
        
        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("categories")

        expect(Array.isArray(response.body.data.categories)).toBe(true)
        expect(response.body.data.categories[0]).toHaveProperty("id")
        category_id = response.body.data.categories[0].id
        expect(response.body.data.categories[0]).toHaveProperty("name")
        expect(response.body.data.categories[0]).toHaveProperty("price")
        expect(response.body.data.categories[0]).toHaveProperty("description")
    })

    test("Create order with valid payload", async() => {
        const response = await request(app).post("/graphql")
            .set({
                "Authorization": `Bearer ${customer_jwt}`
            })
            .send({
                query:
                `mutation {
                    post_order(category: "${category_id}"){
                        id, status, date, 
                        category { id }
                        user { id }
                    }
                }`
            })

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("post_order")

        expect(response.body.data.post_order).toHaveProperty("id")
        order_id = response.body.data.post_order.id
        expect(response.body.data.post_order).toHaveProperty("status")
        expect(response.body.data.post_order).toHaveProperty("date")
        expect(response.body.data.post_order).toHaveProperty("category")
        expect(response.body.data.post_order).toHaveProperty("user")

        expect(response.body.data.post_order.status).toBe("Pending confirmation")

        expect(response.body.data.post_order.category).toHaveProperty("id")
        expect(response.body.data.post_order.category.id).toBe(category_id)

        expect(response.body.data.post_order.user).toHaveProperty("id")
    })

    test("Create order with invalid payload", async() => {
        const response = await request(app).post("/graphql")
            .set({
                "Authorization": `Bearer ${customer_jwt}`
            })
            .send({
                query:
                `mutation {
                    post_order(){
                        id, status, date, 
                        category { id }
                        user { id }
                    }
                }`
            })

        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })

    test("Get category with valid id", async() => {
        const response = await request(app).post("/graphql")
            .set({
                "Authorization": `Bearer ${customer_jwt}`
            })
            .send({
                query:
                `query {
                    order(id: "${order_id}"){
                        id, status, date, 
                        category { id }
                        user { id }
                    }
                }`
            })

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("order")

        expect(response.body.data.order).toHaveProperty("id")
        expect(response.body.data.order).toHaveProperty("status")
        expect(response.body.data.order).toHaveProperty("date")
        expect(response.body.data.order).toHaveProperty("category")
        expect(response.body.data.order).toHaveProperty("user")

        expect(response.body.data.order.id).toBe(order_id)
        expect(response.body.data.order.status).toBe("Pending confirmation")

        expect(response.body.data.order.category).toHaveProperty("id")
        expect(response.body.data.order.category.id).toBe(category_id)

        expect(response.body.data.order.user).toHaveProperty("id")
    })
})
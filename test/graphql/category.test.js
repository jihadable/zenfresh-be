const request = require("supertest")
const app = require("./testApp")
const mongoose = require("mongoose")

describe("Category API", () => {
    let jwt, category_id

    afterAll(async() => {
        await mongoose.connection.close()
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
        jwt = response.body.data.login.jwt
        expect(response.body.data.login).toHaveProperty("user")

        expect(response.body.data.login.user).toHaveProperty("id")
        expect(response.body.data.login.user).toHaveProperty("name")
        expect(response.body.data.login.user).toHaveProperty("email")
        expect(response.body.data.login.user).toHaveProperty("role")

        expect(response.body.data.login.user.name).toBe("zenfresh admin")
        expect(response.body.data.login.user.email).toBe("zenfreshadmin@gmail.com")
        expect(response.body.data.login.user.role).toBe("admin")
    })

    test("Create category", async() => {
        const response = await request(app).post("/graphql")
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({
                query:
                `mutation {
                    post_category(
                        name: "test category",
                        price: 1000,
                        description: "test description"
                    ){ id, name, price, description }
                }`
            })
        
        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("post_category")
        
        expect(response.body.data.post_category).toHaveProperty("id")
        category_id = response.body.data.post_category.id
        expect(response.body.data.post_category).toHaveProperty("name")
        expect(response.body.data.post_category).toHaveProperty("price")
        expect(response.body.data.post_category).toHaveProperty("description")

        expect(response.body.data.post_category.name).toBe("test category")
        expect(response.body.data.post_category.price).toBe(1000)
        expect(response.body.data.post_category.description).toBe("test description")
    })

    test("Create category with invalid payload", async() => {
        const response = await request(app).post("/graphql")
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({
                query:
                `mutation {
                    post_category(){ id, name, price, description }
                }`
            })
        
        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })

    test("Create category without jwt", async() => {
        const response = await request(app).post("/graphql")
            .send({
                query:
                `mutation {
                    post_category(){ id, name, price, description }
                }`
            })

        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors)).toBe(true)
    })

    test("Get categories", async() => {
        const response = await request(app).post("/graphql").send({
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
        expect(response.body.data.categories[0]).toHaveProperty("name")
        expect(response.body.data.categories[0]).toHaveProperty("price")
        expect(response.body.data.categories[0]).toHaveProperty("description")
    })

    test("Get category by id", async() => {
        const response = await request(app).post("/graphql").send({
            query: 
            `query {
                category(id: "${category_id}"){
                    id, name, price, description
                }
            }`
        })
        
        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("category")

        expect(response.body.data.category).toHaveProperty("id")
        expect(response.body.data.category).toHaveProperty("name")
        expect(response.body.data.category).toHaveProperty("price")
        expect(response.body.data.category).toHaveProperty("description")

        expect(response.body.data.category.name).toBe("test category")
        expect(response.body.data.category.price).toBe(1000)
        expect(response.body.data.category.description).toBe("test description")
    })

    test("Get category with invalid id", async() => {
        const response = await request(app).post("/graphql").send({
            query: 
            `query {
                category(id: "xxx"){
                    id, name, price, description
                }
            }`
        })
        
        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors))
    })

    test("Delete category by id", async() => {
        const response = await request(app).post("/graphql")
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({
                query: 
                `mutation {
                    delete_category(id: "${category_id}")
                }`
            })

        expect(response.body).not.toHaveProperty("errors")
        expect(response.body).toHaveProperty("data")

        expect(response.body.data).toHaveProperty("delete_category")

        expect(response.body.data.delete_category).toBe(true)
    })

    test("Delete category with invalid id", async() => {
        const response = await request(app).post("/graphql")
            .set({
                "Authorization": `Bearer ${jwt}`
            })
            .send({
                query:
                `mutation {
                    delete_category(id: "xxx")
                }`
            })
        
        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors))
    })

    test("Delete category without jwt", async() => {
        const response = await request(app).post("/graphql")
            .send({
                query:
                `mutation {
                    delete_category(id: "${jwt}")
                }`
            })

        expect(response.body).toHaveProperty("errors")
        expect(Array.isArray(response.body.errors))
    })
})
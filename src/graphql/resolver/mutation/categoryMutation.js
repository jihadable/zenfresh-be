import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql"
import redis from "../../../config/redis.js"
import authMiddleware from "../../../middleware/authMiddleware.js"
import categoryService from "../../../service/categoryService.js"
import CategoryType from "../../type/categoryType.js"

const categoryMutation = {
    post_category: {
        type: CategoryType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            price: { type: new GraphQLNonNull(GraphQLInt) },
            description: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async(_, { name, price, description }, { authorization }) => {
            try {
                authMiddleware(authorization, "admin")

                const category = await categoryService.addCategory({ name, price, description })

                const redisKey = `category:${category._id}`
                await redis.setEx(redisKey, 60 * 60, JSON.stringify(category))
    
                return category
            } catch(error){
                throw error
            }
        }
    },
    delete_category: {
        type: GraphQLBoolean,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async(_, { id }, { authorization }) => {
            try {
                authMiddleware(authorization, "admin")
                
                await categoryService.deleteCategoryById(id)

                const redisKey = `category:${category._id}`
                await redis.del(redisKey)
    
                return true
            } catch(error){
                throw error
            }
        }
    }
}

export default categoryMutation
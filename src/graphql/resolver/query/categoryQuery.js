import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql"
import redis from "../../../config/redis.js"
import categoryService from "../../../service/categoryService.js"
import CategoryType from "../../type/categoryType.js"

const categoryQuery = {
    category: {
        type: CategoryType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async(_, { id }) => {
            try {
                const redisKey = `category:${id}`
                const categoryInRedis = await redis.get(redisKey)

                if (categoryInRedis){
                    return JSON.parse(categoryInRedis)
                }

                const category = await categoryService.getCategoryById(id)

                await redis.setEx(redisKey, 60 * 60, JSON.stringify(category))
    
                return category
            } catch(error){
                throw error
            }
        }
    },
    categories: {
        type: new GraphQLList(CategoryType),
        resolve: async() => {
            try {
                const redisKey = `categories`
                const categoriesInRedis = await redis.get(redisKey)

                if (categoriesInRedis){
                    return JSON.parse(categoriesInRedis)
                }

                const categories = await categoryService.getCategories()

                await redis.setEx(redisKey, 60 * 60, JSON.stringify(categories))
    
                return categories
            } catch(error){
                throw error
            }
        }
    }
}

export default categoryQuery
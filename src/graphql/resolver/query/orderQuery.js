import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql"
import redis from "../../../config/redis.js"
import authMiddleware from "../../../middleware/authMiddleware.js"
import orderService from "../../../service/orderService.js"
import OrderType from "../../type/orderType.js"

const orderQuery = {
    order: {
        type: OrderType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async(_, { id }, { authorization }) => {
            try {
                authMiddleware(authorization)

                const redisKey = `order:${id}`
                const orderInRedis = await redis.get(redisKey)

                if (orderInRedis){
                    return JSON.parse(orderInRedis)
                }

                const order = await orderService.getOrderById(id)

                await redis.setEx(redisKey, 60 * 60, JSON.stringify(order))
    
                return order
            } catch(error){
                throw error
            }
        }
    },
    user_orders: {
        type: new GraphQLList(OrderType),
        resolve: async(_, __, { authorization }) => {
            try {
                const { id } = authMiddleware(authorization, "customer")

                const orders = await orderService.getOrdersByUser(id)

                return orders
            } catch(error){
                throw error
            }
        }
    },
    orders: {
        type: new GraphQLList(OrderType),
        resolve: async(_, __, { authorization }) => {
            try {
                authMiddleware(authorization, "admin")

                const orders = await orderService.getOrders()
    
                return orders
            } catch(error){
                throw error
            }
        }
    },
    unseen_orders: {
        type: GraphQLInt,
        resolve: async(_, __, { authorization }) => {
            authMiddleware(authorization, "admin")

            const unseenOrders = await orderService.getUnseenOrders()

            return unseenOrders.length
        }
    }
}

export default orderQuery
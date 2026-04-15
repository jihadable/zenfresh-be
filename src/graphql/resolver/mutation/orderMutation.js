import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql"
import { orderTrigger } from "../../../config/pusher.js"
import redis from "../../../config/redis.js"
import { categoryMapper, orderMapper, userMapper } from "../../../helper/mapper.js"
import authMiddleware from "../../../middleware/authMiddleware.js"
import emailVerifiedMiddleware from "../../../middleware/emailVerificationMiddleware.js"
import categoryService from "../../../service/categoryService.js"
import orderService from "../../../service/orderService.js"
import userService from "../../../service/userService.js"
import OrderType from "../../type/orderType.js"

const orderMutation = {
    post_order: {
        type: OrderType,
        args: {
            category: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async(_, { category }, { authorization }) => {
            try {
                const { id, is_email_verified } = authMiddleware(authorization, "customer")
                emailVerifiedMiddleware(is_email_verified)
    
                const order = await orderService.addOrder({ user: id, category })

                const unseenOrders = await orderService.getUnseenOrders()
                await orderTrigger("unseen_orders", unseenOrders.length)

                const categoryForPopulatedOrder = await categoryService.getCategoryById(order.category)
                const user = await userService.getUserById(order.user)
                const populatedOrder = {
                    ...orderMapper(order),
                    category: categoryMapper(categoryForPopulatedOrder),
                    user: userMapper(user)
                }
                await orderTrigger("order_created", populatedOrder)

                const redisKey = `order:${order._id}`
                await redis.setEx(redisKey, 60 * 60, JSON.stringify(order))
    
                return order
            } catch(error){
                throw error
            }
        }
    },
    update_order: {
        type: OrderType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            status: { type: new GraphQLNonNull(GraphQLString) },
            total_price: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve: async(_, { id, status, total_price }, { authorization }) => {
            try {
                authMiddleware(authorization, "admin")
    
                const order = await orderService.updateOrderById(id, { status, total_price })
                const category = await categoryService.getCategoryById(order.category)
                const user = await userService.getUserById(order.user)

                const populatedOrder = {
                    ...orderMapper(order),
                    category: categoryMapper(category),
                    user: userMapper(user)
                }
                await orderTrigger("order_updated", populatedOrder)

                const redisKey = `order:${order._id}`
                await redis.del(redisKey)
    
                return order
            } catch(error){
                throw error
            }
        }
    },
    delete_order: {
        type: GraphQLBoolean,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async(_, { id }, { authorization }) => {
            try {
                authMiddleware(authorization, "admin")
    
                await orderService.deleteOrderById(id)

                const redisKey = `order:${id}`
                await redis.del(redisKey)
    
                return true
            } catch(error){
                throw error
            }
        }
    },
    mark_all_seen: {
        type: GraphQLBoolean,
        resolve: async(_, __, { authorization }) => {
            try {
                authMiddleware(authorization, "admin")

                await orderService.markAllSeen()
                await orderTrigger("unseen_orders", 0)

                return true
            } catch(error){
                throw error
            }
        }
    }
}

export default orderMutation
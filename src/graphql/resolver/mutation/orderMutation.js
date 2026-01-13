const { GraphQLID, GraphQLString, GraphQLBoolean, GraphQLNonNull, GraphQLInt } = require("graphql")
const OrderType = require("../../type/orderType")
const { orderTrigger } = require("../../../config/pusher")
const orderService = require("../../../service/orderService")
const categoryService = require("../../../service/categoryService")
const userService = require("../../../service/userService")
const authMiddleware = require("../../../middleware/authMiddleware")

const orderMutation = {
    post_order: {
        type: OrderType,
        args: {
            category: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async(_, { category }, { authorization }) => {
            try {
                const { id } = authMiddleware(authorization, "customer")
    
                const order = await orderService.addOrder({ user: id, category })

                const unseenOrders = await orderService.getUnseenOrders()
                await orderTrigger("unseen_orders", unseenOrders.length)
                const populatedOrder = {
                    ...order.toObject?.() ?? order,
                    id: order._id,
                    category: await categoryService.getCategoryById(order.category),
                    user: await userService.getUserById(order.user)
                }
                await orderTrigger("order_created", populatedOrder)
    
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

                const populatedOrder = {
                    ...order.toObject?.() ?? order,
                    id: order._id,
                    category: await categoryService.getCategoryById(order.category),
                    user: await userService.getUserById(order.user)
                }
                await orderTrigger("order_updated", populatedOrder)
    
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

module.exports = orderMutation
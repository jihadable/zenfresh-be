const { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt } = require("graphql")
const orderService = require("../../../service/orderService")
const OrderType = require("../../type/orderType")
const authMiddleware = require("../../../middleware/authMiddleware")

const orderQuery = {
    order: {
        type: OrderType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async(_, { id }, { authorization }) => {
            try {
                authMiddleware(authorization)

                const order = await orderService.getOrderById(id)
    
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

module.exports = orderQuery
const { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt } = require("graphql")
const orderService = require("../../service/orderService")
const OrderType = require("../../type/orderType")
const { authorizeRole, auth } = require("../../../helper/auth")

const orderQuery = {
    order: {
        type: OrderType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async(_, { id }, { authorization }) => {
            try {
                const { id: user_id, role } = auth(authorization)

                const order = await orderService.getOrderById(id)

                if (user_id !== id && role !== "customer"){
                    throw new Error("Pengguna tidak diizinkan")
                }
    
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
                const { id } = authorizeRole(authorization, "customer")

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
                authorizeRole(authorization, "admin")

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
            authorizeRole(authorization, "admin")

            const unseenOrders = await orderService.getUnseenOrders()

            return unseenOrders.length
        }
    }
}

module.exports = orderQuery
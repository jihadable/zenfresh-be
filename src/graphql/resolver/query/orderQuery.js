const { GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql")
const orderService = require("../../service/orderService")
const OrderType = require("../../type/orderType")
const { authorizeRole, auth } = require("../../../helper/auth")

const orderQuery = {
    order: {
        type: OrderType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async(_, { id }, context) => {
            try {
                auth(context)

                const order = await orderService.getOrderById(id)
    
                return order
            } catch(error){
                console.log(error)
                throw error
            }
        }
    },
    user_orders: {
        type: OrderType,
        resolve: async(_, __, context) => {
            try {
                const { id } = authorizeRole(context, "customer")

                const orders = await orderService.getOrdersByUser(id)

                return orders
            } catch(error){
                console.log(error)
                throw error
            }
        }
    },
    orders: {
        type: new GraphQLList(OrderType),
        resolve: async() => {
            try {
                authorizeRole(context, "admin")

                const orders = await orderService.getOrders()
    
                return orders
            } catch(error){
                console.log(error)
                throw error
            }
        }
    }
}

module.exports = orderQuery
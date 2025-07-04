const { GraphQLID, GraphQLString, GraphQLBoolean, GraphQLNonNull, GraphQLInt } = require("graphql")
const OrderType = require("../../type/orderType")
const orderService = require("../../service/orderService")
const { authorizeRole } = require("../../../helper/auth")

const orderMutation = {
    post_order: {
        type: OrderType,
        args: {
            category: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async(_, { category }, context) => {
            try {
                const { id } = authorizeRole(context, "customer")
    
                const order = await orderService.addOrder({ user: id, category })
    
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
        resolve: async(_, { id, status, total_price }, context) => {
            try {
                authorizeRole(context, "admin")
    
                const order = orderService.updateOrderById(id, { status, total_price })
    
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
        resolve: async(_, { id }, context) => {
            try {
                authorizeRole(context, "admin")
    
                await orderService.deleteOrderById(id)
    
                return true
            } catch(error){
                throw error
            }
        }
    }
}

module.exports = orderMutation
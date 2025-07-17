const { GraphQLID, GraphQLString, GraphQLBoolean, GraphQLNonNull, GraphQLInt } = require("graphql")
const OrderType = require("../../type/orderType")
const orderService = require("../../service/orderService")
const { authorizeRole } = require("../../../helper/auth")
const pubsub = require("../../../helper/pubsub")

const orderMutation = {
    post_order: {
        type: OrderType,
        args: {
            category: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async(_, { category }, { authorization }) => {
            try {
                const { id } = authorizeRole(authorization, "customer")
    
                const order = await orderService.addOrder({ user: id, category })

                const unseenOrders = await orderService.getUnseenOrders()
                pubsub.publish("UNSEEN_ORDERS", { unseen_orders: unseenOrders.length })
                pubsub.publish("ORDER_CREATED", { order_created: order })
    
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
                authorizeRole(authorization, "admin")
    
                const order = orderService.updateOrderById(id, { status, total_price })

                pubsub.publish("ORDER_UPDATED", { order_updated: order })
    
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
                authorizeRole(authorization, "admin")
    
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
                authorizeRole(authorization, "admin")

                await orderService.markAllSeen()
                pubsub.publish("UNSEEN_ORDERS", { unseen_orders: 0 })

                return true
            } catch(error){
                throw error
            }
        }
    }
}

module.exports = orderMutation
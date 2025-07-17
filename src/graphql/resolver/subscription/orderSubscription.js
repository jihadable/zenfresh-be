const { authorizeRole, auth } = require("../../../helper/auth");
const pubsub = require("../../../helper/pubsub");
const OrderType = require("../../type/orderType");
const { GraphQLInt } = require("graphql");

const orderSubscription = {
    unseen_orders: {
        type: GraphQLInt,
        subscribe: (_, __, { authorization }) => {
            authorizeRole(authorization, "admin")

            return pubsub.asyncIterableIterator("UNSEEN_ORDERS")
        }
    },
    order_created: {
        type: OrderType,
        subscribe: (_, __, { authorization }) => {
            authorizeRole(authorization, "admin")

            return pubsub.asyncIterableIterator("ORDER_CREATED")
        }
    },
    order_updated: {
        type: OrderType,
        subscribe: (_, __, { authorization }) => {
            auth(authorization)

            return pubsub.asyncIterableIterator("ORDER_UPDATED")
        }
    }
}

module.exports = orderSubscription
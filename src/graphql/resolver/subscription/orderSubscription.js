const pubsub = require("../../../helper/pubsub");
const OrderType = require("../../type/orderType");
const { GraphQLID } = require("graphql");

const orderSubscription = {
    order_updated: {
        type: OrderType,
        args: { id: { type: GraphQLID } },
        subscribe: (_, { id }) => pubsub.asyncIterableIterator(`ORDER_UPDATED_${id}`)
    }
}

module.exports = orderSubscription
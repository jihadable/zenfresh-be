const { GraphQLObjectType } = require("graphql")
const orderSubscription = require("./orderSubscription")

const Subscription = new GraphQLObjectType({
    name: "Subscription",
    fields: {
        ...orderSubscription
    }
})

module.exports = Subscription
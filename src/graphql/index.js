const { GraphQLSchema } = require("graphql");
const Query = require("./resolver/query");
const Mutation = require("./resolver/mutation");
const Subscription = require("./resolver/subscription");

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
    subscription: Subscription
})

module.exports = schema
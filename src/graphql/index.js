const { GraphQLSchema } = require("graphql");
const Query = require("./resolver/query");
const Mutation = require("./resolver/mutation");

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})

module.exports = schema
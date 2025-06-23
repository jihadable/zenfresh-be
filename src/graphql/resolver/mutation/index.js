const { GraphQLObjectType } = require("graphql");
const userMutation = require("./userMutation");
const categoryMutation = require("./categoryMutation");
const orderMutation = require("./orderMutation");

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...userMutation,
        ...categoryMutation,
        ...orderMutation
    }
})

module.exports = Mutation
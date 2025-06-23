const { GraphQLObjectType } = require("graphql");
const userQuery = require("./userQuery");
const categoryQuery = require("./categoryQuery");
const orderQuery = require("./orderQuery");

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        ...userQuery,
        ...categoryQuery,
        ...orderQuery
    }
})

module.exports = Query
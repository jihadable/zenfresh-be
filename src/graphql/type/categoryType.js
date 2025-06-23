const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = require("graphql");

const CategoryType = new GraphQLObjectType({
    name: "CategoryType",
    fields: () => ({
        id: { type: GraphQLID, resolve: parent => parent._id },
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
        description: { type: GraphQLString }
    })
})

module.exports = CategoryType
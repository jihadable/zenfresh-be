const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLNonNull } = require("graphql");
const CategoryType = require("./categoryType");
const UserType = require("./userType");
const categoryService = require("../../service/categoryService");
const userService = require("../../service/userService");

const OrderType = new GraphQLObjectType({
    name: "OrderType",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID), resolve: parent => parent._id },
        status: { type: new GraphQLNonNull(GraphQLString) },
        total_price: { type: GraphQLInt },
        date: { type: new GraphQLNonNull(GraphQLString) },
        category: {
            type: new GraphQLNonNull(CategoryType),
            resolve: async(parent) => {
                const category = await categoryService.getCategoryById(parent.category)

                return category
            }
        },
        user: {
            type: new GraphQLNonNull(UserType),
            resolve: async(parent) => {
                const user = await userService.getUserById(parent.user)

                return user
            }
        }
    })
})

module.exports = OrderType
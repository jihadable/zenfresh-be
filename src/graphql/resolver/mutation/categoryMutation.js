const { GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLID, GraphQLNonNull } = require("graphql");
const CategoryType = require("../../type/categoryType");
const categoryService = require("../../service/categoryService");
const { authorizeRole } = require("../../../helper/auth");

const categoryMutation = {
    post_category: {
        type: CategoryType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            price: { type: new GraphQLNonNull(GraphQLInt) },
            description: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async(_, { name, price, description }, context) => {
            try {
                authorizeRole(context, "admin")

                const category = await categoryService.addCategory({ name, price, description })
    
                return category
            } catch(error){
                console.log(error)
                throw error
            }
        }
    },
    delete_category: {
        type: GraphQLBoolean,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async(_, { id }, context) => {
            try {
                authorizeRole(context, "admin")
                
                await categoryService.deleteCategoryById(id)
    
                return true
            } catch(error){
                console.log(error)
                throw error
            }
        }
    }
}

module.exports = categoryMutation
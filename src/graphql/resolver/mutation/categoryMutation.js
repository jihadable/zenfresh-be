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
        resolve: async(_, { name, price, description }, { authorization }) => {
            try {
                authorizeRole(authorization, "admin")

                const category = await categoryService.addCategory({ name, price, description })
    
                return category
            } catch(error){
                throw error
            }
        }
    },
    delete_category: {
        type: GraphQLBoolean,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async(_, { id }, { authorization }) => {
            try {
                authorizeRole(authorization, "admin")
                
                await categoryService.deleteCategoryById(id)
    
                return true
            } catch(error){
                throw error
            }
        }
    }
}

module.exports = categoryMutation
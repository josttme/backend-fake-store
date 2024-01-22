const categoriesModel = require("./models/categoriesModel");
const productsModel = require("./models/productsModel");
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Products {
    id: ID
    price: Float
    title: String
    description: String
    imageMedium: String
    category: Category
    credit: Credit
  }
  type Credit {
    author: String
    authorLink: String
    sourceLink: String
  }
  type Category {
    id: ID
    name: String
  }
  type Query {
    categories: [Category]
    products: [Products]
    category(categoryId: ID): [Products]
    product(id: ID!): Products
  }
`;

const resolvers = {
  Query: {
    products() {
      return productsModel.list();
    },
    categories() {
      return categoriesModel.list();
    },
    product(_, { id }) {
      return productsModel.find({ id });
    },
    category(_, { categoryId }) {
      return productsModel.list({ categoryId });
    },
  },
};

module.exports = { typeDefs, resolvers };

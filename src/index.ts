import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql 
  type Product {
    id: ID!
    name: String!
    price: Int
    description: String
    isActive: Boolean
  }

  type Categories {
    id: ID!
    name: String!
  }

  type Brands {
    id: ID!
    name: String!
  }

  type Query {
    products: [Product]
    categories: [Categories]
    brands: [Brands]
  }
`;

const resolvers = {
  Query: {
    products: () => [
      {
        id: "1",
        name: "Product 1",
        price: 100,
        description: "Description 1",
        isActive: true,
      },
      {
        id: "2",
        name: "Product 2",
        price: 200,
        description: "Description 2",
        isActive: false,
      },
    ],
    categories: () => [
      { id: "1", name: "Category 1" },
      { id: "2", name: "Category 2" },
    ],
    brands: () => [
      { id: "1", name: "Brand 1" },
      { id: "2", name: "Brand 2" },
    ],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

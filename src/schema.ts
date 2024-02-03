export const typeDefs = `#graphql 
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

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

let products = [
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
  {
    id: "3",
    name: "Product 3",
    price: 100,
    description: "Description 1",
    isActive: true,
  },
  {
    id: "4",
    name: "Product 4",
    price: 200,
    description: "Description 2",
    isActive: false,
  },
];

let categories = [
  { id: "1", name: "Category 1", product_id: "2" },
  { id: "2", name: "Category 2", product_id: "1" },
];

let brands = [
  { id: "1", name: "Brand 1" },
  { id: "2", name: "Brand 2" },
];

const db = {
  products,
  categories,
  brands,
};

const typeDefs = `#graphql 
  type Product {
    id: ID!
    name: String!
    price: Int
    description: String
    isActive: Boolean
    category: [Categories!]!
  }

  type Categories {
    id: ID!
    name: String!
    product: Product!
  }

  type Brands {
    id: ID!
    name: String!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
    categories: [Categories]
    brands: [Brands]
  }

  type Mutation {
    addProduct(product: ProductInput!): Product
    editProduct(id: String!, product: ProductEditInput!): Product
    addBrand(name: String!): Brands
  }

  input ProductInput {
    name: String!
    price: Int
    description: String
    isActive: Boolean
  }

  input ProductEditInput {
    name: String
    price: Int
    description: String
    isActive: Boolean
  }
`;

const resolvers = {
  Query: {
    products: () => {
      return db.products;
    },
    categories: () => {
      return db.categories;
    },
    brands: () => {
      return db.brands;
    },
    product: (_, args) => {
      return db.products.find((product) => product.id === args.id);
    },
  },
  Product: {
    category: (parent) => {
      return db.categories.filter(
        (category) => category.product_id === parent.id
      );
    },
  },
  Mutation: {
    addProduct: (_, args) => {
      const newProduct = {
        ...args.product,
        id: String(db.products.length + 1),
      };

      db.products.push(newProduct);

      return newProduct;
    },
    addBrand: (_, args) => {
      const newBrand = {
        id: String(db.brands.length + 1),
        name: args.name,
      };

      db.brands.push(newBrand);

      return newBrand;
    },
    editProduct: (_, args) => {
      const product = db.products.find((product) => product.id === args.id);

      if (!product) {
        throw new Error("Product not found");
      }

      const updatedProduct = {
        ...product,
        ...args.product,
      };

      db.products = db.products.map((product) =>
        product.id === args.id ? updatedProduct : product
      );

      return updatedProduct;
    },
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

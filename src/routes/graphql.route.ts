import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import ProductService from '@/services/products.service';

class GraphqlRoute implements Routes {
  public path = '/gql';
  public router = Router();
  public product = new ProductService();

  constructor() {
    this.initializeRoutes();
  }

  private async initializeRoutes() {
    const typeDefs = `
    type Query {
      info: String!
      products: [Product!]!
      findProduct(keyword: String!): [Product!]!
    }

    type Product {
      id: ID!
      uuid: String!
      title: String!
      description: String!
      currency: String!
      price: String!
      quantity: Int!
      picture: String!
    }
    `;

    const resolvers = {
      Query: {
        info: () => `This is the API of MYOS-Shop`,
        products: async () => await this.product.findAllProduct(),
        findProduct: async (parent, args, contextValue, info) =>
          await this.product.findProduct(args.keyword),
      },
      Product: {
        id: parent => parent.id,
        uuid: parent => parent.uuid,
        description: parent => parent.description,
        title: parent => parent.title,
        currency: parent => parent.currency,
        price: parent => parent.price,
        picture: parent => parent.picture,
      },
    };

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: {
        PrismaClient,
      },
    });

    server
      .listen()
      .then(({ url }) => console.log(`Server is running on ${url}`));
  }
}

export default GraphqlRoute;

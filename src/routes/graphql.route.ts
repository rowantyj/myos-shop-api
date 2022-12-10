import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { PrismaClient } from '@prisma/client';
import ProductService from '@/services/products.service';
import OrderService from '@/services/orders.service';
import { ApolloServer } from 'apollo-server';

class GraphqlRoute implements Routes {
  public path = '/gql';
  public router = Router();
  public product = new ProductService();
  public order = new OrderService();

  constructor() {
    this.initializeRoutes();
  }

  private async initializeRoutes() {
    const typeDefs = `
    type Query {
      info: String!
      products: [Product!]!
      findProduct(keyword: String!): [Product!]!
      orders: [Order!]!
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
    type Order {
      id: ID!
      uuid: String!
      status: String!
      created_at: String!
      updated_at: String!
      items: [Product!]!

    }
    `;

    const resolvers = {
      Query: {
        info: () => `This is the API of MYOS-Shop`,
        products: async () => await this.product.findAllProduct(),
        findProduct: async (parent, args, contextValue, info) =>
          await this.product.findProduct(args.keyword),
        orders: async () => await this.order.findAllOrder(),
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
      Order: {
        id: parent => parent.id,
        uuid: parent => parent.uuid,
        status: parent => parent.status,
        items: parent => parent.items,
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
      .then(({ url }) => console.log(`Graphql Server is running on ${url}`));
  }
}

export default GraphqlRoute;

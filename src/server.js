/* eslint-disable-next-line */
import 'babel-polyfill';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import bodyParser from 'body-parser';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const graphQLServer = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: {},
  tracing: true
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = `0`;

graphQLServer.use(bodyParser.json());
apolloServer.applyMiddleware({ app: graphQLServer });

graphQLServer.get(`/`, (_, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send({ token: `378a922ba0f54c541a4281e8519020084373d0b1` });
});

graphQLServer.get(`/playground`, expressPlayground({ endpoint: `/graphql` }));

export default graphQLServer;

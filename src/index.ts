import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
type User {
  id: ID!
  name: String
}

type Query {
  user(id: ID!): User
}
`;

const users = [
  {
    id: '1',
    name: 'Elizabeth Bennet',
  },
  {
    id: '2',
    name: 'Fitzwilliam Darcy',
  },
];

const resolvers = {
  Query: {
    user(parent, args, contextValue, info) {
      console.log('args', args)
      return users.find((user) => user.id === args.id);
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
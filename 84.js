const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'مرحباً من GraphQL!'
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀 الخادم جاهز على ${url}`);
});
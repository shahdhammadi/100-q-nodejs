const typeDefs = gql`
    type Query {
        hello: String
    }
    
    type Mutation {
        add(a: Int!, b: Int!): Int
    }
`;

const resolvers = {
    Query: {
        hello: () => 'مرحباً!'
    },
    Mutation: {
        add: (_, { a, b }) => a + b
    }
};
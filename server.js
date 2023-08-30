const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

const API_PORT = 8080;

server.listen({port: API_PORT || 8000}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
}).catch((err) => {
    console.log(err);
})
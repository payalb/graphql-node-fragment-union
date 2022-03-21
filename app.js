const {ApolloServer} = require("apollo-server")
const typeDefs = require( "./schema/typedefs/user-def");
const resolvers = require("./schema/resolvers/user-resolver");
const server = new ApolloServer({typeDefs , resolvers, context: ({req}) => { 
    return {
     req
    }
}}); 
server.listen().then(({url})=> {
    console.log(`Server started ${url}`);
})

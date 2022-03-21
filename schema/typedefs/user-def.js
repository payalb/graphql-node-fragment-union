const {gql} = require('apollo-server')

const typeDefs = gql`

   type Post{
      id: ID
      title: String
   }

   fragment data on Post{
      title: String
   }

   interface Person {
      id: ID
      name: String
   }
   type User implements Person{
       id: ID
      name: String
      posts: [Post]
   }

   input UserInput{
      name: String!
      posts: [PostInput]
   }

   input PostInput{
      title: String
   }

   type Query{
      user(userid : ID ): UserResult
      users: [Person]
      posts: [Post]
      post(id : ID!): Post
   }

   type Mutation{
      createUser(input: UserInput!): [User]
      deleteUser(id: ID!): [User]
   }

   type UsersSuccessResult {
      users: [User!]!
   }

   type UserErrorResult {
      message: String!
   }

   union UserResult = UsersSuccessResult | UserErrorResult
`
   module.exports= typeDefs
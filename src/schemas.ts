import { gql } from 'apollo-server'

export default gql`
  type Query {
    getTodos: [Todo]
    getUser: User
    getPosts: [Post]
  }

  type Todo {
    task: String
    completed: Boolean
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    avatar: String
    joinDate: String
    favorites: [Post]
  }

  type Post {
    _id: ID
    title: String!
    imageUrl: String!
    categories: [String]!
    description: String!
    createdDate: String
    likes: Int
    createdBy: User!
    messages: [Message]
  }

  type Message {
    _id: ID
    messageBody: String!
    messageDate: String
    messageUser: User!
  }

  type Mutation {
    addTodo(task: String, completed: Boolean): Todo
    addPost(
      title: String!
      imageUrl: String!
      categories: [String]!
      description: String!
      creatorId: ID!
    ): Post!
    signupUser(username: String!, email: String!, password: String!): User!
  }
`

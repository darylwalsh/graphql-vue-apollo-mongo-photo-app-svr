import { gql } from 'apollo-server'

export default gql`
  
  type Query {
    getTodos: [Todo]
  }

  type Todo {
    task: String
    completed: Boolean
  }

  type Mutation {
    addTodo(task: String, completed: Boolean): Todo
  }
`

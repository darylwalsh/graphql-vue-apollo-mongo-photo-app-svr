import { ApolloServer } from 'apollo-server';
import mongoose  from 'mongoose'
import { environment } from './environment'
import resolvers from './resolvers';
import typeDefs from './schemas';
import { User } from './models/User'
import { Post } from './models/Post'

const todos = [
  { task: 'Wash car', completed: false},
  { task: 'Clean room', completed: true}
]

mongoose
  .connect(environment.mongouri, { useNewUrlParser: true})
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err))

  // Create Apollo/GraphQL server
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: {
    User,
    Post
  },
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
})

server
  .listen(environment.port)
  .then(({ url }) => console.log(`Server ready at ${url}. `))

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}

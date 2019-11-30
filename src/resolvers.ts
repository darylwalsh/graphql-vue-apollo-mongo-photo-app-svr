const todos = [
  { task: 'Wash car', completed: false },
  { task: 'Clean room', completed: true },
]


  interface PostInterface {
    title: string
    imageUrl: string
    categories: []
    description: string
    createdDate: string
    likes: number
    createdBy: userArgs
    messages: []
    creatorId: string
    find?: any
  }

type addTodoArgs = {
  task: string
  completed: boolean
}
type userArgs = {
  _id?: string
  username: string
  email: string
  password: string
  avatar?: String
  joinDate?: String
  favorites?: []
  findOne?: any
}

export default {
  Query: {
    getTodos: () => todos,
    getPosts: async (_: {}, args: PostInterface, { Post }: {Post: PostInterface}) => {
      const posts = await Post.find({})
        .sort({ createdDate: "desc" })
        .populate({
          path: "createdBy",
          model: "User"
        });
      return posts;
    }
  },
  Mutation: {
    addTodo: (_: {}, { task, completed }: addTodoArgs) => {
      const todo = { task, completed }
      todos.push(todo)
      return todo
    },
    addPost: async (
      _: {},
      { title, imageUrl, categories, description, creatorId }: PostInterface,
      { Post }: {Post: PostInterface}
    ) => {
           //@ts-ignore
           const newPost = await new Post({
             title,
             imageUrl,
             categories,
             description,
             createdBy: creatorId,
           }).save()
           return newPost
         },
    signupUser: async (
      _: {},
      { username, email, password }: userArgs,
      { User }: { User: userArgs }
    ) => {
      const user = await User.findOne({ username })
      if (user) {
        throw new Error('User already exists')
      }
      //@ts-ignore
      const newUser = await new User({
        username,
        email,
        password,
      }).save()
      return newUser
    },
  },
}


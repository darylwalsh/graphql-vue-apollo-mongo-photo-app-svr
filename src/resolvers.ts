const todos = [
  { task: 'Wash car', completed: false },
  { task: 'Clean room', completed: true },
]

type addTodoArgs = {
  task: string
  completed: boolean
}
export default {
  Query: {
    getTodos: () => todos
    },
  Mutation: {
    addTodo: (_: {}, {task,completed}: addTodoArgs)  => {
      const todo = {task, completed}
      todos.push(todo)
      return todo
    }

  }
}


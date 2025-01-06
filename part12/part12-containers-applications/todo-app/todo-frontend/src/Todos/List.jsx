import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const handleDelete = (todo) => {
    deleteTodo(todo)
  }

  const handleComplete = (todo) => {
    completeTodo(todo)
  }

  return (
    <>
      {todos.map(todo => (
        <div key={todo.id}>
          <Todo todo={todo} onDelete={handleDelete} onComplete={handleComplete} />
          <hr />
        </div>
      ))}
    </>
  )
}

export default TodoList

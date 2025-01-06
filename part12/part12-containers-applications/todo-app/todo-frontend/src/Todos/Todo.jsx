import React from 'react'

const Todo = ({ todo, onDelete, onComplete }) => {
  const onClickDelete = () => onDelete(todo)
  const onClickComplete = () => onComplete(todo)

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
      <span>{todo.text}</span>
      {todo.done ? (
        <>
          <span>This todo is done</span>
          <span>
            <button onClick={onClickDelete}>Delete</button>
          </span>
        </>
      ) : (
        <>
          <span>This todo is not done</span>
          <span>
            <button onClick={onClickDelete}>Delete</button>
            <button onClick={onClickComplete}>Set as done</button>
          </span>
        </>
      )}
    </div>
  )
}

export default Todo

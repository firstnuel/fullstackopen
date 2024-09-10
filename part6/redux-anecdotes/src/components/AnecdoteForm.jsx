import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notify,rmNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(content))
        dispatch(notify(content))
        setTimeout(() => {
          dispatch(rmNotification())
        }, 5000)
      }

    return (
        <>
          <h2>create new</h2>
          <form onSubmit={addAnecdote}>
            <div><input name='anecdote'/></div>
            <button>create</button>
          </form>
         </>
    )
}

export default AnecdoteForm
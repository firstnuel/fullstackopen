import { useDispatch } from 'react-redux'
// import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
// import anecdoteService from '../services/anecdote'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = async event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(createAnecdote(content))
        event.target.anecdote.value = ''
        setNotification(`new anecdote '${content}'`, 3000)
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
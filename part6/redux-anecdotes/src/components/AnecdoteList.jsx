import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      if( state.filter === 'ALL'){
        return state.anecdotes
      }
      return state.anecdotes.filter(anecdote => 
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)

    const handleVote = (anecdote) => {
      dispatch(addVote(anecdote))
      setNotification(`you voted '${anecdote.content}'`, 3000)

    } 

    return(
        <>
       {notification && <Notification />}
        {[...anecdotes]
      .sort((a,b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </>
    )
}


export default AnecdoteList
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify, rmNotification } from '../reducers/notificationReducer'
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
      dispatch(vote(anecdote.id))
      dispatch(notify(`you voted '${anecdote.content}'`))
      setTimeout(() => {
        dispatch(rmNotification())
      }, 5000)
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
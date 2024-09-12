import { useQueryClient, useMutation } from '@tanstack/react-query'
import anecdoteService from '../services/anecdote'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const newNoteMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: (newNote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newNote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    if (content && content.length>5) {
      event.target.anecdote.value = ''
      newNoteMutation.mutate(content)
    } else {
      alert('Anecdote cannot be less than 5')
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

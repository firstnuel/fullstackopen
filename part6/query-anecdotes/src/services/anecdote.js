import axios from 'axios'

const getId = () => (100000 * Math.random()).toFixed(0)

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newAnecdote => {
    const content = {
        content: newAnecdote,
        id : getId(),
        votes : 0
    }
    const response = await axios.post(baseUrl, content)
    return response.data
}

const update = async (newObject ) => {
    const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return response.data 
}

export default { getAll, create, update }
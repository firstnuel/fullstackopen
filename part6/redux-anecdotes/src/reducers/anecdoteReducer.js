import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name : 'anecdotes',
  initialState : [],
  reducers: {
    vote (state , action){
      const updatedAn  = action.payload
      return state.map(anecdote =>
         anecdote.id === updatedAn.id? updatedAn : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { vote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newObj = await anecdoteService.create(anecdote)
    dispatch(appendAnecdote(newObj))
  }
}

export const addVote = objToUpdate => {
  return async dispatch => {
    const updateObj = await anecdoteService.update(objToUpdate.id, {
      ...objToUpdate, 
      votes: objToUpdate.votes+1
    })
    dispatch(vote(updateObj))
  }
}
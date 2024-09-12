// import { act } from "react"
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'
// import { useSelector } from 'react-redux'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]
export const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }
// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name : 'anecdotes',
  initialState : [],
  reducers: {
    vote (state , action){
      const updatedAn  = action.payload
      // const anToUpdate = state.find(anecdote => anecdote.id === updatedAn.id)
      // const updatedAn = {...anToUpdate, votes : anToUpdate.votes+1 }
      return state.map(anecdote =>
         anecdote.id === updatedAn.id? updatedAn : anecdote)
    },
    // newAnecdote(state , action) {
    //   const newAnecdote = {
    //     content : action.payload,
    //     id: getId(),
    //     votes: 0
    //   }
    //   state.push(newAnecdote)
    // },
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
    // const anecdotes = useSelector(state => state.anecdotes)
    // const objToUpdate = anecdotes.find(anecdote => anecdote.id === id)
    const updateObj = await anecdoteService.update(objToUpdate.id, {...objToUpdate, votes: objToUpdate.votes+1})
    dispatch(vote(updateObj))
  }
}